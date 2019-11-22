import React from 'react';
import { Container, Content, Footer } from 'rsuite';
import 'rsuite/lib/styles/index.less';
import NavigationHeader from '../components/NavigationHeader';

const config = [{
    title: 'Home',
    route: '/'
}, {
    title: 'Books',
    route: '/books'
}, {
    title: 'Authors',
    route: '/authors'
}];

export default Page => props => (
    <Container>
        <NavigationHeader title="Library" config={config} />
        <Content><Page {...props} /></Content>
        <Footer>Footer</Footer>
    </Container>
);