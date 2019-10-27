//testing
//fgyfguyhfguhfhjugfhyujfghujfhfugyhfuhjfg
//as
import React, { Component, Fragment } from 'react';
import Party from './party';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PageTitle from '../../../layout/pagetitle/pagetitle';


export default class EmployeeMaster extends Component {
    render() {
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <PageTitle
                        heading="Party Master"
                        subheading="Yet another dashboard built using only the included Architech elements and components."
                        icon="pe-7s-graph icon-gradient bg-ripe-malin"
                    />
                </ReactCSSTransitionGroup>
                <Party />
            </Fragment>
        )
    }
}