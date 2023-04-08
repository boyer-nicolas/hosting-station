import React from "react";

class Portainer extends React.Component
{
    render()
    {
        return (
            <div className="ratio ratio-16x9">
                <iframe src="https://portainer.localhost" allowFullScreen></iframe>
            </div>
        )
    }
}

export default Portainer;