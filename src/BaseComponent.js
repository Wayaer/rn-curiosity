'use strict';
import React, {PureComponent} from 'react';
import {
  Text, Image, View,
  ImageBackground, TouchableOpacity,
} from 'react-native';
import {Constant} from './BaseConstant';
import Curiosity from './Curiosity';

/**
 * 自定义 点击按钮
 */
export class TouchView extends PureComponent {
  constructor(props) {
    super(props);
    if (this.props.onPress) {
      this.time = 0;
    }  // 上次点击时间
  }

  render() {
    if (this.props.onPress) {
      return (
        <TouchableOpacity
          {...this.props}
          activeOpacity={this.props.activeOpacity ? this.props.activeOpacity : this.props.onPress ? 0.36 : 1}
          onPress={() => {
            if (this.props.onPress) {
              let now = new Date().getTime();
              if ((now - this.time) < 200) {
                return;
              }
              this.time = now;
              this.props.onPress();
            }
          }}>
          {this.props.children}
        </TouchableOpacity>
      );
    } else {
      return (<View
        {...this.props}>
        {this.props.children}
      </View>);

    }
  }
}

/**
 * 自定义 CenterView
 *
 * style  //样式
 */
export class CenterView extends PureComponent {
  render() {
    return (<TouchView
        {...this.props}
        onPress={this.props.onPress}
        style={[{
          alignItems: 'center',
          justifyContent: 'center',
        }, this.props.style]}>
        {this.props.children}
      </TouchView>
    );

  }
}

/**
 * 自定义 Button
 */
export class CustomButton extends PureComponent {
  render() {
    return (
      <CenterView
        {...this.props}
        style={this.props.buttonStyle}
        onPress={this.props.onPress}>
        <Text
          {...this.props}
          style={this.props.textStyle}>
          {this.props.children}
        </Text>
      </CenterView>
    );
  }
}

/**
 * 自定义 Image
 *
 */
export class CustomImage extends PureComponent {
  //resizeMode
  // cover 模式只求在显示比例不失真的情况下填充整个显示区域。可以对图片进行放大或者缩小，超出显示区域的部分不显示， 也就是说，图片可能部分会显示不了。
  // contain 模式是要求显示整张图片, 可以对它进行等比缩小, 图片会显示完整,可能会露出Image控件的底色。 如果图片宽高都小于控件宽高，则不会对图片进行放大。
  // stretch 模式不考虑保持图片原来的宽,高比.填充整个Image定义的显示区域,这种模式显示的图片可能会畸形和失真。
  // center 模式, 9月11号的0.33版本才支持，contain模式基础上支持等比放大。

  render() {
    if (this.props.onPress) {
      return (
        <CenterView
          {...this.props}
          style={this.props.buttonStyle}
          onPress={this.props.onPress}>
          {this.renderImage()}
        </CenterView>
      );
    } else {
      return this.renderImage();
    }
  }

  renderImage = () => {
    return (<Image
        {...this.props}
        source={this.props.source || this.props.url && {uri: this.props.url} || this.props.require && this.props.require}
        style={[{resizeMode: 'contain'}, this.props.style]}/>
    );
  };
}


/*
* 自定义ImageBackground
* */
export class CustomImageBackground extends PureComponent {
  render() {
    return (
      <ImageBackground
        {...this.props}
        source={this.props.source || this.props.url && {uri: this.props.url} || this.props.require && this.props.require}
        style={[{
          width: Constant.Screen_Width,
          resizeMode: 'contain',
        }, this.props.style]}>
        {this.props.children}
      </ImageBackground>
    );
  }
}


/**
 * 自定义 Checkbox
 */
export class CustomCheckbox extends PureComponent {
  constructor(props) {
    super(props);
    this.onChange = props.onChange;
    this.checkedIcon = props.checkedIcon;
    this.uncheckedIcon = props.uncheckedIcon;
    this.state = {
      checked: props.checked || false,
    };
  }

  render() {
    return (
      <TouchView
        style={[{flexDirection: 'row'}, this.props.style]}
        onPress={() => {
          this.setState({
            checked: this.props.checked || !this.state.checked,
          }, () => {
            return this.onChange(this.state.checked);
          });
        }}>
        <CustomImage
          require={this.state.checked ? (this.checkedIcon || require('./icons/checkbox_true.png')) : (this.uncheckedIcon || require('./icons/checkbox_false.png'))}
          style={[{
            width: Curiosity.getWidth(30),
            height: Curiosity.getWidth(30),
          }, this.props.imageStyle]}/>
        <Text style={[{
          marginLeft: Curiosity.getWidth(10),
          color: Constant.mainBlack,
        }, this.props.titleStyle]}>{this.props.title}</Text>
      </TouchView>
    );
  }
}

/**
 * 自定义 TabBarItem
 */
export class TabBarItem extends PureComponent {
  render() {
    return (
      <TouchView
        {...this.props}
        style={[{alignItems: 'center', justifyContent: 'center'}, this.props.style]}
        onPress={this.props.onPress}>
        <CustomImage
          {...this.props}
          source={this.props.imageSource}
          style={[{
            width: Curiosity.getWidth(23),
            height: Curiosity.getWidth(23),
          }, this.props.imageStyle]}/>
        <CustomButton
          {...this.props}
          textStyle={[{marginTop: 1}, this.props.textStyle]}>{this.props.text}</CustomButton>
      </TouchView>
    );
  }
}




