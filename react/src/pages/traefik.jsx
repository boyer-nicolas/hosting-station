import React from "react";

class Traefik extends React.Component
{
    render()
    {
        return (
            <div className="ratio ratio-16x9">
                <iframe src="https://traefik.localhost" allowFullScreen></iframe>
            </div>
        )
    }
}

export default Traefik;