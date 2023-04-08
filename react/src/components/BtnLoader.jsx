import { Button, Spinner } from 'react-bootstrap';

export default function BtnLoader()
{
    return (
        <Button variant="primary" disabled>
            <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
            />
            Loading...
        </Button>
    )
}