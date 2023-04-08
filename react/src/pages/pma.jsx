import React from "react";
import PageLoader from "../components/PageLoader";

class PMA extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            isLoading: true,
        };
    }

    componentDidMount()
    {
        this.setState({
            isLoading: false,
        });
    }

    render()
    {
        return (
            <>
                <div className="ratio ratio-16x9">
                    {this.state.isLoading ? <PageLoader /> : <iframe src="https://pma.localhost" allowFullScreen></iframe>}
                </div>
            </>
        )
    }
}

export default PMA;