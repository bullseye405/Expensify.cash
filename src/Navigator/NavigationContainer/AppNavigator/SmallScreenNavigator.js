import _ from 'underscore';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const SmallScreenNavigator = props => (
    <RootStack.Navigator
        mode="modal"
    >
        {props.authenticated
            ? (

                // These are the protected screens and only accessible when an authToken is present.
                <>
                    <RootStack.Screen
                        name="Home"
                        options={{
                            headerShown: false,
                            title: 'Expensify.cash',
                        }}
                    >
                        {() => (
                            <MainStack.Navigator>
                                <MainStack.Screen
                                    name={props.sidebarRoute.name}
                                    component={props.sidebarRoute.Component}
                                    options={{
                                        headerShown: false,
                                    }}
                                />
                                {_.map(props.mainRoutes, route => (
                                    <MainStack.Screen
                                        name={route.name}
                                        component={route.Component}
                                        key={route.name}
                                        options={{
                                            headerShown: false,
                                        }}
                                    />
                                ))}
                            </MainStack.Navigator>
                        )}
                    </RootStack.Screen>
                    {_.map(props.modalRoutes, (route) => {
                        const ModalStack = createStackNavigator();
                        return (
                            <RootStack.Screen
                                key={route.name}
                                name={route.name}
                                options={{
                                    headerShown: false,
                                }}
                            >
                                {() => (
                                    <ModalStack.Navigator>
                                        {_.map(route.subRoutes, subRoute => (
                                            <ModalStack.Screen
                                                key={subRoute.name}
                                                name={subRoute.name}
                                                component={subRoute.Component}
                                                options={{
                                                    headerShown: false,
                                                }}
                                            />
                                        ))}
                                    </ModalStack.Navigator>
                                )}
                            </RootStack.Screen>
                        );
                    })}
                </>
            )
            : (

                // This is the public route a.k.a. what user's without an authToken will see.
                <RootStack.Screen
                    name={props.publicRoute.name}
                    options={props.publicRoute.options}
                    component={props.publicRoute.Component}
                />
            )}
    </RootStack.Navigator>
);

export default SmallScreenNavigator;