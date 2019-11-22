import React from 'react';
import PropTypes from 'prop-types';
import {Header, Icon, Nav, Navbar} from "rsuite";
import {useRouter} from 'next/router';


const NavigationHeader = ({config, title}) => {
    const {route, push} = useRouter();

    const handleSelect = routeKey => push(routeKey);

    return (
        <Header>
            <Navbar appearance="inverse">
                <Navbar.Header>
                    {title}
                </Navbar.Header>
                <Navbar.Body>
                    <Nav activeKey={route} onSelect={handleSelect}>
                        {config.map(({...routeProps}) => (
                            <Nav.Item key={routeProps.route} eventKey={routeProps.route}>
                                {routeProps.title}
                            </Nav.Item>
                        ))}
                    </Nav>
                    <Nav pullRight>
                        <Nav.Item icon={<Icon icon="cog"/>}>Logout</Nav.Item>
                    </Nav>
                </Navbar.Body>
            </Navbar>
        </Header>
    );
};


NavigationHeader.propTypes = {
    config: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        route: PropTypes.string
    })),
    title: PropTypes.string.isRequired
};

NavigationHeader.defaultProps = {
    config: []
};

export default NavigationHeader;