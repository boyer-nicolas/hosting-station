const express = require('express');
const router = express.Router();
const fs = require('fs');
const simpleGit = require('simple-git');
const path = require('path');
const api = require('../core/api');

class Apps
{
  constructor()
  {
    this.projectsDir = '/var/opt/projects';
    this.api = new api();

    // Routing
    router.get('/', (req, res) =>
    {
      this.index(req, res);
    });

    router.post('/add', (req, res) =>
    {
      this.add(req, res);
    });

    router.post('/env', (req, res) =>
    {
      this.env(req, res);
    });

    router.post('/delete', (req, res) =>
    {
      this.delete(req, res);
    });

    router.post('/single', (req, res) =>
    {
      this.single(req, res);
    });

    router.post('/utd', (req, res) =>
    {
      this.utd(req, res);
    });

    router.post('/online', (req, res) =>
    {
      this.online(req, res);
    });

    router.post('/check-name', (req, res) =>
    {
      this.checkName(req, res);
    });

    router.post('/check-git', (req, res) =>
    {
      this.checkGit(req, res);
    });
  }

  index(req, res)
  {
    const getDirectories = source =>
      fs.readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    let apps = getDirectories(this.projectsDir);
    let projects = {};

    let i = 1;
    let numberOfApps = apps.length;

    this.api.get('/projects?populate=*').then(body =>
    {
      console.log(body.data.data)
      for (let project of body.data.data)
      {
        let projectInfo = project.attributes;

        if (fs.existsSync(`${this.projectsDir}/${projectInfo.basename}/.git`))
        {
          if (projectInfo.infrastructure.data)
          {
            projects[i] = {
              name: projectInfo.prettyname,
              slug: projectInfo.basename,
              description: projectInfo.description,
              infrastructureName: projectInfo.infrastructure.data.attributes.prettyname,
              infrastructureGit: projectInfo.infrastructure.data.attributes.giturl,
              type: projectInfo.project_type.data.attributes.identifier,
              url: projectInfo.giturl,
              online: projectInfo.online
            }
          }
          else
          {
            projects[i] = {
              name: projectInfo.prettyname,
              slug: projectInfo.basename,
              description: projectInfo.description,
              infrastructureName: "none",
              infrastructureGit: "none",
              type: projectInfo.project_type.data.attributes.identifier,
              url: projectInfo.giturl,
              online: projectInfo.online
            }
          }
        }

        i++;
      }

      return res.json(projects);
    });

  }

  env(req, res)
  {
    if (!req.body.name)
    {
      return res.json({
        error: 'Project name is required'
      });
    }
    let projectName = req.body.name;

    if (fs.existsSync(`${this.projectsDir}/${projectName}/.env`))
    {
      fs.readFile(`${this.projectsDir}/${projectName}/.env`, 'utf8', (err, data) =>
      {
        if (err)
        {
          return res.json({
            error: err
          });
        }

        return res.json({
          env: data
        });
      });
    }
    else if (fs.existsSync(`${this.projectsDir}/${projectName}/.example.env`))
    {
      fs.copyFile(`${this.projectsDir}/${projectName}/.example.env`, `${this.projectsDir}/${projectName}/.env`, (err) =>
      {
        if (err)
        {
          return res.json({
            error: err
          });
        }

        return res.json({
          env: "example.env copied"
        });
      });
    }
    else
    {
      return res.json({
        error: "No .env or .example.env file found"
      });
    }

  }

  checkProjectsDirExists(req, res)
  {
    try
    {
      if (!fs.existsSync(this.projectsDir))
      {
        fs.mkdirSync(this.projectsDir);
      }
    } catch (err)
    {
      console.error(err)
    }
  }

  add(req, res)
  {
    this.checkName(req, res).then((result) =>
    {
      if (result)
      {
        if (!req.body.name)
        {
          return res.json({
            error: 'Project name is required'
          });
        }

        if (!req.body.type)
        {
          return res.json({
            error: 'Project type is required'
          });
        }

        if (!req.body.infrastructure)
        {
          return res.json({
            error: 'Project infrastructure is required'
          });
        }

        if (!req.body.description)
        {
          return res.json({
            error: 'Project description is required'
          });
        }

        if (!req.body.git)
        {
          return res.json({
            error: 'Project git is required'
          });
        }

        let projectName = req.body.name;
        let projectType = req.body.type;
        let projectDescription = req.body.description;
        let projectGit = req.body.git;
        let projectInfrastructure = req.body.infrastructure;

        let projectDir = path.basename(projectGit);
        projectDir = projectDir.replace(/\.git$/, '');
        let projectPath = `${this.projectsDir}/${projectDir}`;

        this.git = simpleGit(`${this.projectsDir}`);

        if (fs.existsSync(projectPath))
        {
          return res.json({
            error: 'Project already exists'
          });
        }
        else 
        {
          let useInfra = 1;
          if (projectInfrastructure == 0)
          {
            console.log('no infrastructure');
            useInfra = 0;
            projectInfrastructure = 1;
          }
          let infrastructureId = projectInfrastructure;
          this.api.get('/infrastructures/' + infrastructureId).then(body =>
          {
            let infrastructure = body.data.data.attributes.giturl;

            if (useInfra === 1)
            {
              this.git.clone(infrastructure, projectDir, (err) =>
              {
                if (err)
                {
                  console.error(err);
                  return res.json({
                    error: err.toString()
                  });
                }
                else
                {
                  this.git.clone(projectGit, `${projectDir}/app`, (err) =>
                  {
                    if (err)
                    {
                      console.error(err);
                      return res.json({
                        error: err.toString()
                      });
                    }
                    else
                    {
                      let projectInfo = {
                        data: {
                          prettyname: projectName,
                          basename: projectDir,
                          description: projectDescription,
                          project_type: projectType,
                          infrastructure: projectInfrastructure,
                          giturl: projectGit,
                          online: false
                        }
                      };

                      this.api.post('/projects', projectInfo).then(body =>
                      {
                        if (err)
                        {
                          console.error(err);
                          return res.json({
                            error: err.toString()
                          });
                        }
                        else
                        {
                          console.log('New Project added');
                          return res.json({
                            success: 'Project added'
                          })
                        }
                      });
                    }
                  });
                }
              });
            }
            else
            {
              this.git.clone(projectGit, `${projectDir}`, (err) =>
              {
                if (err)
                {
                  console.error(err);
                  return res.json({
                    error: err.toString()
                  });
                }
                else
                {
                  let projectInfo = {
                    data: {
                      prettyname: projectName,
                      basename: projectDir,
                      description: projectDescription,
                      project_type: projectType,
                      giturl: projectGit,
                      online: false
                    }
                  };

                  this.api.post('/projects', projectInfo).then(body =>
                  {
                    if (err)
                    {
                      console.error(err);
                      return res.json({
                        error: err.toString()
                      });
                    }
                    else
                    {
                      console.log('New Project added');
                      return res.json({
                        success: 'Project added'
                      })
                    }
                  });
                }
              });
            }
          });
        }
      }
      else
      {
        return res.json({
          error: 'Project already exists'
        });
      }
    });
  }

  single(req, res)
  {
    const getDirectories = source =>
      fs.readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    let apps = getDirectories(this.projectsDir);
    let project = {};

    let i = 1;
    for (let app of apps)
    {
      if (fs.existsSync(`${this.projectsDir}/${app}/.git`))
      {
        if (req.body.name === app)
        {

          this.api.get('/projects?filters[basename][$eq]=' + app + "&populate=*").then(body =>
          {
            let projectInfo = body.data.data[0].attributes;

            if (projectInfo.infrastructure.data)
            {
              project = {
                name: projectInfo.prettyname,
                slug: app,
                description: projectInfo.description,
                infrastructureName: projectInfo.infrastructure.data.attributes.prettyname,
                infrastructureGit: projectInfo.infrastructure.data.attributes.giturl,
                type: projectInfo.project_type.data.attributes.identifier,
                url: projectInfo.giturl,
                online: projectInfo.online
              }
            }
            else
            {
              project = {
                name: projectInfo.prettyname,
                slug: app,
                description: projectInfo.description,
                infrastructureName: "none",
                infrastructureGit: "none",
                type: projectInfo.project_type.data.attributes.identifier,
                url: projectInfo.giturl,
                online: projectInfo.online
              }
            }


            return res.json(project);

          });
        }

        i++;
      }
    }
  }

  utd(req, res)
  {
    if (fs.existsSync(`${this.projectsDir}/${req.body.name}/app`))
    {
      if (fs.existsSync(`${this.projectsDir}/${req.body.name}/app/.git`))
      {
        const git = simpleGit(`${this.projectsDir}/${req.body.name}/app`);
        git.fetch('origin', 'main', (err, update) =>
        {
          if (err)
          {
            return res.json({
              upToDate: false
            })
          }
          else
          {
            git.status().then((status) =>
            {
              if (status.behind > 0)
              {
                return res.json({
                  upToDate: false
                })
              }
              else
              {
                return res.json({
                  upToDate: true
                })
              }
            });
          }
        });
      }
      else
      {
        return res.json({
          upToDate: false,
          usingGit: false
        })
      }
    }
    else
    {
      if (fs.existsSync(`${this.projectsDir}/${req.body.name}/.git`))
      {
        const git = simpleGit(`${this.projectsDir}/${req.body.name}`);
        git.fetch('origin', 'main', (err, update) =>
        {
          if (err)
          {
            return res.json({
              upToDate: false
            })
          }
          else
          {
            git.status().then((status) =>
            {
              if (status.behind > 0)
              {
                return res.json({
                  upToDate: false
                })
              }
              else
              {
                return res.json({
                  upToDate: true
                })
              }
            });
          }
        });
      }
      else
      {
        return res.json({
          upToDate: false,
          usingGit: false
        })
      }
    }
  }

  online(req, res)
  {
    let projectName = req.body.name;

    this.api.get('/projects?filters[basename][$eq]=' + projectName + "&populate=*").then(body =>
    {
      let projectInfo = body.data.data[0].attributes;

      return res.json(projectInfo.online);

    });
  }

  checkName(req, res)
  {
    return new Promise((resolve, reject) =>
    {
      let gitURL = req.body.name;

      this.api.get('/projects?filters[giturl][$eq]=' + gitURL).then(body =>
      {
        if (body.data.data.length > 0)
        {
          resolve(false);
        }
        else
        {
          resolve(true);
        }
      });
    });
  }

  checkGit(req, res)
  {
    let gitURL = req.body.name;

    this.api.get('/projects?filters[giturl][$eq]=' + gitURL).then(body =>
    {
      if (body.data.data.length > 0)
      {
        res.json({
          error: 'This project already exists'
        })
      }
      else
      {
        res.json({
          success: 'Project does not exist'
        })
      }
    });
  }

  delete(req, res)
  {
    let projectName = req.body.name;

    // Get project ID
    this.api.get('/projects?filters[basename][$eq]=' + projectName).then(body =>
    {
      let projectID = body.data.data[0].id;
      // Delete project
      this.api.delete('/projects/' + projectID).then(body =>
      {
        fs.rmdir(`${this.projectsDir}/${projectName}`, { recursive: true }, (err) =>
        {
          if (err)
          {
            return res.json({
              error: "Could not delete project folder: " + err
            })
          }
          else 
          {
            return res.json({
              success: 'Project deleted'
            })
          }
        });
      }).catch(err =>
      {
        return res.json({
          error: "Could not delete project from API: " + err
        })
      });
    }).catch(err =>
    {
      return res.json({
        error: "Could not get project ID: " + err
      })
    });


  }
}

new Apps();

module.exports = router;
