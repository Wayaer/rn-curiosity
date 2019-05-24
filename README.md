
# rn-curiosity

### rn-curiosity 致力于快速搭建app，封装多个常用 组件 方法，统一管理。同时会慢慢加入更多功能和组件，如问题 可及时提issues , 


## 必须加入的库
`$  npm install rn-curiosity --save`

`$  npm install react-native-fast-image --save`  //大图片优化

`$  npm install rn-fetch-blob --save`       //网络框架

`$  npm install @react-native-community/async-storage --save`

`$  npm install @react-native-community/netinfo --save`

`$ react-native link`

##推荐使用的库
```
 react-native-syan-image-picker --save//图片选择
 
 lottie-react-native 动画库
```

##所有组件方法导入方式
rn-curiosity 继承 react-native 、react-native-snap-carousel、@react-native-community/netinfo、@react-native-community/async-storage 全部组件和方法
```

import {TouchView, Utils, View, React, Component} from "rn-curiosity";

```
###组件

```
   # 继承  TouchableOpacity 加入200ms 延迟点击
   <TouchView/> 
   
   # 继承  TouchView  内部居中
   <CenterView/>  
   
   
   # 继承  CenterView 
   <CustomButton
      buttonStyle={{}}    #外部View样式
      textStyle={{}}      #内部Text样式
   />   
   
         
   # 继承  CenterView
   <CustomImage
       buttonStyle={{}} #有onPress 属性
       style={{}}       #无onPress 时 等同于Image组件
   />
   
   # 继承 ImageBackground
   <CustomImageBackground/>
   
   
   # Checkbox
   <CustomCheckbox
      onChange={(check)=>{
         //
      }}
      checkedIcon={ }     //选中时 的图片
      uncheckedIcon={  }  //未选中时 的图片
      checked={  }        // 默认状态
   />
   # 首页TabBar
   <TabBarItem/>
   
   # 渐变组件     
   <LinearGradient
       horizontal={true}
       colors={['#000000', '#ffffff']}
       viewStyle={{
           flexDirection: 'row',
           height: Constant.CurrentHeight + Utils.getHeight(100),
           paddingTop: Constant.CurrentHeight,
           alignItems: 'center',
           width: Screen_Width,
           justifyContent: 'space-between',
           paddingHorizontal: Utils.getWidth(25),
       }}
       style={{}}>
   
   </LinearGradient>
   
   # 单线动画
   <BarLine
    progress={this.state.progress}  //0 ~ 1
    style={{
        width: this.width,
        unfilledColor: Colors.gray999,
        color: Colors.blueStart,
    }}/>}
    
    # 时间选择器 
    <DatePicker/>

```
 时间选择器 参考[rn-selector](https://github.com/Wayaer/rn-selector)
      

###常量
```
import {FontSize, Colors, Constant,} from "rn-curiosity";

  FontSize.textSize_20  => 7 ~ 65 字体大小
  
  Colors.mainWhite    
  
  Constant
     Constant.IOS                     //ios设备
     Constant.Android                 //android设备
     Constant.ActualScreen_Height     //屏幕实际高度 （包含全面屏和非全面屏）
     Constant.Screen_Width            //屏幕宽度
     Constant.Screen_Scale            //屏幕像素密度
     Constant.ShadowStyle             //阴影样式 （兼容ios && android）
       
``` 

###方法 Utils
[参考Utils文件](https://github.com/Wayaer/rn-curiosity/blob/master/src/Utils.js)

```
  使用方法
  
  Utils.方法名()
  
  Utils.sendMessageNativeToJS()

```



