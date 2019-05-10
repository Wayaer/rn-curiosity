'use strict';
import React, {Component} from 'react';
import {Bar, Circle, Pie, CircleSnail,} from 'react-native-progress'

/**
 * 自定义 BarLine
 *
 */
export class BarLine extends Component {
    render() {
        return (
            <Bar
                {...this.props}
                progress={this.props.progress}
                width={this.props.style.width || 100}
                height={this.props.style.height || 1}
                unfilledColor={this.props.style.unfilledColor}
                color={this.props.style.color}
                borderWidth={this.props.style.borderWidth || 0}
            />
        )
    }
}
