'use strict';
import {Platform, processColor, NativeModules, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';

const NativeLinearGradient = NativeModules.LinearGradient;

export class LinearGradient extends Component {

    constructor(props) {
        super(props);
        this.style = props.style;
        this.viewStyle = props.viewStyle;
        this.horizontal = props.horizontal || false;//是否横向渐变，默认竖向
        this.children = props.children;
        this.colors = props.colors || ['#fff', '#000'];
    }

    render() {
        return (
            <NativeClass
                start={this.horizontal ? {x: 0.0, y: 0.5} : {x: 0.5, y: 0.0}}//开始的坐标
                end={this.horizontal ? {x: 1.0, y: 0.5} : {x: 0.5, y: 1.0}}//结束的坐标
                colors={this.props.colors}
                style={[{
                    justifyContent: 'center',
                    alignItems: 'center',
                }, this.style]}>
                <View style={this.viewStyle}>
                    {this.children}
                </View>
            </NativeClass>
        )
    }
}

const convertPoint = (name, point) => {
    if (Array.isArray(point)) {
        console.warn(
            `LinearGradient '${name}' property should be an object with fields 'x' and 'y', ` +
            'Array type is deprecated.',
        );
        if (Platform.OS === 'ios') {
            return {
                x: point[0],
                y: point[1],
            };
        }
    }

    if (Platform.OS === 'android') {
        if (point !== null && typeof point === 'object') {
            return [point.x, point.y];
        }
    }
    return point;
};


const validNumber = (defaultValue) => (value) => {
    return typeof value === 'number' ? value : defaultValue;
};

class NativeClass extends Component {

    render() {
        if (Platform.OS === 'android') {
            const {
                children,
                start,
                end,
                colors,
                locations,
                useAngle,
                angleCenter,
                angle,
                style,
                ...otherProps
            } = this.props;
            if ((colors && locations) && (colors.length !== locations.length)) {
                console.warn('LinearGradient colors and locations props should be arrays of the same length');
            }
            const flatStyle = StyleSheet.flatten(style) || {};
            const borderRadius = flatStyle.borderRadius || 0;
            const validRadius = validNumber(borderRadius);
            const borderRadiiPerCorner = [
                validRadius(flatStyle.borderTopLeftRadius),
                validRadius(flatStyle.borderTopLeftRadius),
                validRadius(flatStyle.borderTopRightRadius),
                validRadius(flatStyle.borderTopRightRadius),
                validRadius(flatStyle.borderBottomRightRadius),
                validRadius(flatStyle.borderBottomRightRadius),
                validRadius(flatStyle.borderBottomLeftRadius),
                validRadius(flatStyle.borderBottomLeftRadius),
            ];
            return (
                <View ref={(component) => {
                    this.gradientRef = component;
                }} {...otherProps} style={style}>
                    <NativeLinearGradient
                        style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}
                        colors={colors.map(processColor)}
                        startPoint={convertPoint('start', start)}
                        endPoint={convertPoint('end', end)}
                        locations={locations ? locations.slice(0, colors.length) : null}
                        useAngle={useAngle}
                        angleCenter={convertPoint('angleCenter', angleCenter)}
                        angle={angle}
                        borderRadii={borderRadiiPerCorner}
                    />
                    {children}
                </View>
            );
        } else if (Platform.OS === 'ios') {
            const {
                start,
                end,
                colors,
                locations,
                useAngle,
                angleCenter,
                angle,
                ...otherProps
            } = this.props;

            if ((colors && locations) && (colors.length !== locations.length)) {
                console.warn('LinearGradient colors and locations props should be arrays of the same length');
            }
            return (
                <NativeLinearGradient
                    ref={(component) => {
                        this.gradientRef = component;
                    }}
                    {...otherProps}
                    startPoint={convertPoint('start', start)}
                    endPoint={convertPoint('end', end)}
                    colors={colors.map(processColor)}
                    locations={locations ? locations.slice(0, colors.length) : null}
                    useAngle={useAngle}
                    angleCenter={convertPoint('angleCenter', angleCenter)}
                    angle={angle}
                />
            );
        }
    }

}
