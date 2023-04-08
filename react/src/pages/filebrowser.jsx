import React from "react";

class FileBrowser extends React.Component
{
    render()
    {
        return (
            <div className="ratio ratio-16x9">
                <iframe src="https://files.localhost" allowFullScreen></iframe>
            </div>
        )
    }
}

export default FileBrowser;