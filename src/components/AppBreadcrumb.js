import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import routes from '../routes';
import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react';

const AppBreadcrumb = () => {
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    const currentLocation = useLocation().pathname;

    useEffect(() => {
        const getRouteName = (pathname, routes) => {
            const matchingRoute = routes.find(route => {
                const routePathSegments = route.path.split('/');
                const pathnameSegments = pathname.split('/');

                if (routePathSegments.length !== pathnameSegments.length) {
                    return false;
                }

                return routePathSegments.every((routeSegment, index) => {
                    return routeSegment === pathnameSegments[index] || routeSegment.startsWith(':');
                });
            });

            if (matchingRoute) {
                if (['BesnuInfo', 'CareerInfo', 'BusinessInfo'].includes(matchingRoute.name)) {
                    return matchingRoute.name.slice(0, -4); // Removing 'Info' from routeName
                } else {
                    return matchingRoute.name;
                }
            } else {
                return false;
            }
        };

        const getBreadcrumbs = (location) => {
            const breadcrumbs = [];
            location.split('/').reduce((prev, curr, index, array) => {
                const currentPathname = `${prev}/${curr}`;
                const routeName = getRouteName(currentPathname, routes);
                if (index === 0 && routeName !== 'Home') {
                    breadcrumbs.push({
                        pathname: '/',
                        name: 'Home',
                        active: false,
                    });
                } else if (['/Home/Users', '/Home/Besnu', '/Home/pragatimandal', '/Home/Career', '/Home/Profile', '/Home/News', '/Home/Business','/Home/Change-Password','/dashboard'].includes(currentPathname)) {
                    breadcrumbs.push({
                        pathname: '/Home',
                        name: 'Home',
                        active: false,
                    });
                    breadcrumbs.push({
                        pathname: currentPathname,
                        name: curr.charAt(0).toUpperCase() + curr.slice(1), // Capitalize first letter of path segment
                        active: true,
                    });
                } else if (routeName === 'UserInfo') {
                    breadcrumbs.push({
                        pathname: '/Home/Users',
                        name: 'Users',
                        active: false,
                    });
                    breadcrumbs.push({
                        pathname: currentPathname,
                        name: 'Details',
                        active: index + 1 === array.length ? true : false,
                    });
                } else if (routeName === 'NewsInfo') {
                    breadcrumbs.push({
                        pathname: '/Home/News',
                        name: 'News',
                        active: false,
                    });
                    breadcrumbs.push({
                        pathname: currentPathname,
                        name: 'Details',
                        active: index + 1 === array.length ? true : false,
                    });
                } else if (routeName === 'Business') {
                    breadcrumbs.push({
                        pathname: '/Home/Business',
                        name: 'Business',
                        active: false,
                    });
                    breadcrumbs.push({
                        pathname: currentPathname,
                        name: 'Details',
                        active: index + 1 === array.length ? true : false,
                    });
                } else if (routeName === 'Besnu') {
                    breadcrumbs.push({
                        pathname: '/Home/Besnu',
                        name: 'Bensu',
                        active: false,
                    });
                    breadcrumbs.push({
                        pathname: currentPathname,
                        name: 'Details',
                        active: index + 1 === array.length ? true : false,
                    });
                } else if (routeName === 'Career') {
                    breadcrumbs.push({
                        pathname: '/Home/Career',
                        name: 'Career',
                        active: false,
                    });
                    breadcrumbs.push({
                        pathname: currentPathname,
                        name: 'Details',
                        active: index + 1 === array.length ? true : false,
                    });
                } else if (routeName === 'MemberInfo') {
                    breadcrumbs.push({
                        pathname: '/Home/Member',
                        name: 'Member',
                        active: false,
                    });
                    breadcrumbs.push({
                        pathname: currentPathname,
                        name: 'Details',
                        active: index + 1 === array.length ? true : false,
                    });
                }
                 else {
                    routeName &&
                        breadcrumbs.push({
                            pathname: currentPathname.includes('/Home') ? currentPathname.substring(5) : currentPathname, // Remove '/Home' prefix
                            name: routeName,
                            active: index + 1 === array.length ? true : false,
                        });
                }
                return currentPathname;
            });
            return breadcrumbs;
        };

        const newBreadcrumbs = getBreadcrumbs(currentLocation);
        setBreadcrumbs(newBreadcrumbs);
    }, [currentLocation]);

    return (
        <CBreadcrumb className="my-0">
            {breadcrumbs.map((breadcrumb, index) => {
                return (
                    <CBreadcrumbItem
                        key={index}
                        active={breadcrumb.active}
                    >
                        {breadcrumb.active ? breadcrumb.name : <Link to={breadcrumb.pathname}>{breadcrumb.name}</Link>}
                    </CBreadcrumbItem>
                );
            })}
        </CBreadcrumb>
    );
};

export default React.memo(AppBreadcrumb);
