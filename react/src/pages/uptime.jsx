import React from "react";

class Uptime extends React.Component
{
    render()
    {
        return (
            <div className="ratio ratio-16x9">
                <iframe src="https://uptime.localhost" allowFullScreen></iframe>
            </div>
        )
    }
}

export default Uptime;