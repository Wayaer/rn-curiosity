'use strict';
import React, {Component} from 'react';
import Utils from "./src/Utils"
const  Curiosity=Utils;
//第三方
import RNFetchBlob from 'rn-fetch-blob'
import SnapCarousel from 'react-native-snap-carousel'
import NetInfo from '@react-native-community/netinfo'
import AsyncStorage from '@react-native-community/async-storage';

import {
    Theme,

    Label,
    Button,
    Checkbox,
    Input,
    Select,
    Stepper,
    SearchInput,
    Badge,
    Popover,

    NavigationBar,
    ListRow,
    Carousel,
    Projector,
    SegmentedBar,
    SegmentedView,
    TabView,
    TransformView,
    AlbumView,
    Wheel,

    TopView,
    Overlay,
    Toast,
    ActionSheet,
    ActionPopover,
    PullPicker,
    PopoverPicker,
    Menu,
    Drawer,
    ModalIndicator,

    TeaNavigator,
    BasePage,
    NavigationPage,

    KeyboardSpace,
} from "teaset"

export * from "react-native";
export * from "./src/BaseComponent";
export * from "./src/BaseConstant";
export * from "./src/component/BarLine";
export * from "./src/component/DatePicker";
export * from "./src/component/LinearGradient";
export * from "react-native-snap-carousel";

export {
    Theme,

    Label,
    // Button,
    //Checkbox,
    Input,
    Select,
    Stepper,
    SearchInput,
    Badge,
    Popover,

    NavigationBar,
    ListRow,
    Carousel,
    Projector,
    SegmentedBar,
    SegmentedView,
    TabView,
    TransformView,
    AlbumView,
    Wheel,

    TopView,
    Overlay,
    Toast,
    ActionSheet,
    ActionPopover,
    PullPicker,
    PopoverPicker,
    Menu,
    Drawer,
    ModalIndicator,

    TeaNavigator,
    BasePage,
    NavigationPage,

    KeyboardSpace,
    /* curiosity */
    React,
    Component,
    SnapCarousel,
    NetInfo, AsyncStorage,
    Utils,Curiosity,
    RNFetchBlob,
}
