'use strict';
import React, {Component} from 'react';
import {Wheel} from "teaset";
import {CustomButton, CenterView, TouchView} from "../BaseComponent";
import {Colors, Constant, FontSize} from "../BaseConstant"
import Utils from "../Utils";

export class DatePicker extends Component {
    /*
     * pickerType:
     *       date        =>年月日选择
     *       dateTime    =>年月日时分秒选择
     *       time        =>时分秒选择
     * */

    constructor(props) {
        super(props);
        this.itemHeight = props.itemHeight || Utils.getHeight(35)
        this.pickerType = props.pickerType || 'dateTime'
        this.title = props.title || 'Select'
        this.cancelText = props.cancelText || 'cancel'
        this.sureText = props.sureText || 'sure'
        this.cancelTextStyle = props.cancelTextStyle || {}
        this.cancelTouchStyle = props.cancelTouchStyle || {}
        this.sureTouchStyle = props.sureTouchStyle || {}
        this.sureTextStyle = props.sureTextStyle || {}
        this.titleTextStyle = props.titleTextStyle || {}
        this.textStyle = props.textStyle || {color: Colors.gray153153}
        this.textViewStyle = this.props.textViewStyle || {
            marginTop: this.itemHeight * 2,
            height: this.itemHeight,
            justifyContent: 'center',
            alignItems: 'center'
        }
        this.onSure = props.onSure
        this.onCancel = props.onCancel
        this.pickerTimeInterval = (this.pickerType !== 'time' && props.pickerTimeInterval && props.pickerTimeInterval) || this.checkPickerTimeInterval()
        this.startDateTime = this.checkDate(this.pickerTimeInterval[0])
        this.endDateTime = this.checkDate(this.pickerTimeInterval[1])
        this.defaultSelectTime = this.pickerType !== 'time' && this.checkDefaultSelectTime(props.defaultSelectTime || this.pickerTimeInterval[0])
        this.showUnit = props.showUnit ? true : false
        this.state = {
            years: this.returnYears(),
            months: this.returnNum(12, 1),
            days: this.returnDays(this.defaultSelectTime.split('-')[0], this.defaultSelectTime.split('-')[1]),
            hours: this.returnNum(23, 0),
            minutes: this.returnNum(59, 0),
            seconds: this.returnNum(59, 0),
            selectYearIndex: this.pickerType === 'time' ? 0 : new Date(this.defaultSelectTime).getFullYear() - new Date(this.startDateTime).getFullYear(),
            selectMonthsIndex: this.pickerType === 'time' ? 0 : new Date(this.defaultSelectTime).getMonth(),
            selectDayIndex: this.pickerType === 'time' ? 0 : new Date(this.defaultSelectTime).getDate() - 1,
            selectHoursIndex: this.pickerType === 'time' || this.pickerType === 'date' ? 0 : new Date(this.defaultSelectTime).getHours(),
            selectMinutesIndex: this.pickerType === 'time' || this.pickerType === 'date' ? 0 : new Date(this.defaultSelectTime).getMinutes(),
            selectSecondsIndex: this.pickerType === 'time' || this.pickerType === 'date' ? 0 : new Date(this.defaultSelectTime).getSeconds(),
        };
    }

    returnYears = () => {
        const startYear = Number(this.startDateTime.split('-')[0])
        const endYear = Number(this.endDateTime.split('-')[0])
        let yearsList = []
        for (let i = 0; i < (endYear - startYear) + 1; i++) {
            yearsList.push(Number(startYear) + i)
        }
        return yearsList
    }
    changeDateTime = (indexData) => {
        const timeStr = this.state.years[indexData.yearIndex !== undefined ? indexData.yearIndex : this.state.selectYearIndex] + '-'
            + this.state.months[indexData.monthsIndex !== undefined ? indexData.monthsIndex : this.state.selectMonthsIndex] + '-'
            + this.state.days[indexData.daysIndex !== undefined ? indexData.daysIndex : this.state.selectDayIndex] + ' '
            + this.state.hours[indexData.hoursIndex !== undefined ? indexData.hoursIndex : this.state.selectHoursIndex] + ':'
            + this.state.minutes[indexData.minutesIndex !== undefined ? indexData.minutesIndex : this.state.selectMinutesIndex] + ':'
            + this.state.seconds[indexData.secondsIndex !== undefined ? indexData.secondsIndex : this.state.selectSecondsIndex]
        const time = new Date(timeStr)
        const days = this.returnDays(this.state.years[indexData.yearIndex !== undefined ? indexData.yearIndex : this.state.selectYearIndex], this.state.months[indexData.monthsIndex !== undefined ? indexData.monthsIndex : this.state.selectMonthsIndex])
        let dayIndex = new Date(time).getDate()
        if (days.length <= this.state.selectDayIndex) {
            dayIndex = days.length
        }
        let monthsIndex = time.getMonth()
        if (indexData.yearIndex !== undefined && this.isLeapYearMethod(this.state.years[this.state.selectYearIndex]) && !this.isLeapYearMethod(this.state.years[indexData.yearIndex]) && this.state.selectMonthsIndex === 1 && this.state.selectDayIndex === 28) {
            monthsIndex -= 1
        }
        this.setState({
            days: days,
            selectYearIndex: time.getFullYear() - new Date(this.startDateTime).getFullYear(),
            selectMonthsIndex: monthsIndex,
            selectDayIndex: dayIndex - 1,
            selectHoursIndex: time.getHours(),
            selectMinutesIndex: time.getMinutes(),
            selectSecondsIndex: time.getSeconds(),
        })
    }
    changeTime = (indexData) => {
        this.setState({
            selectHoursIndex: indexData.hoursIndex !== undefined ? indexData.hoursIndex : this.state.selectHoursIndex,
            selectMinutesIndex: indexData.minutesIndex !== undefined ? indexData.minutesIndex : this.state.selectMinutesIndex,
            selectSecondsIndex: indexData.secondsIndex !== undefined ? indexData.secondsIndex : this.state.selectSecondsIndex,
        })
    }
    checkDefaultSelectTime = (defaultSelectTime) => {
        this.checkDate(defaultSelectTime)
        if (new Date(this.startDateTime) > new Date(defaultSelectTime)) {
            return this.startDateTime
        } else if (new Date(this.endDateTime) < new Date(defaultSelectTime)) {
            return this.endDateTime
        }
        return defaultSelectTime
    }
    monthSize = (month, isLeapYearMethod) => {
        month = Number(month)
        if (month === 4 || month === 6 || month === 9 || month === 11) {
            return 30
        } else if (month === 2) {
            return isLeapYearMethod ? 29 : 28
        } else {
            return 31
        }
    }
    returnDays = (selectYear, selectMonth) => {
        if (selectYear && selectMonth) {
            return this.returnNum(this.monthSize(selectMonth, this.isLeapYearMethod(selectYear)), 1)
        }
        return []
    }


    checkPickerTimeInterval = () => {
        if (this.pickerType === 'data') {
            return ['2019-01-01', '2020-01-01']
        }
        return ['2019-01-01 00:00:00', '2020-01-01 00:00:00']
    }
    checkDate = (dateTime) => {
        if (this.pickerType !== 'time') {
            if (!(Utils.regularStr(/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/, dateTime) ||
                Utils.regularStr(/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/, dateTime))) {
                return console.error('日期格式错误 正确格式 2019-01-01 00:00:00 或 2019-01-01')
            }
            return Utils.checkLegalDate(dateTime.split(' ')[0]) && dateTime
        }
        return dateTime
    }

    returnSelect = () => {
        switch (this.pickerType) {
            case 'date':
                return this.state.years[this.state.selectYearIndex]
                    + '-' + this.state.months[this.state.selectMonthsIndex]
                    + '-' + this.state.days[this.state.selectDayIndex]
            case 'dateTime':
                return this.state.years[this.state.selectYearIndex]
                    + '-' + this.state.months[this.state.selectMonthsIndex]
                    + '-' + this.state.days[this.state.selectDayIndex]
                    + ' ' + this.state.hours[this.state.selectHoursIndex]
                    + ':' + this.state.minutes[this.state.selectMinutesIndex]
                    + ':' + this.state.seconds[this.state.selectSecondsIndex]
            case 'time':
                return this.state.hours[this.state.selectHoursIndex]
                    + ':' + this.state.minutes[this.state.selectMinutesIndex]
                    + ':' + this.state.seconds[this.state.selectSecondsIndex]
        }
    }

    isLeapYearMethod = (year) => {
        const cond1 = year % 4 === 0;
        const cond2 = year % 100 !== 0;
        const cond3 = year % 400 === 0;
        if (cond1 && cond2 || cond3) {
            return true;
        } else {
            return false;
        }
    }
    returnNum = (num, startI) => {
        let numList = []
        for (let i = startI; i <= num; i++) {
            let h
            if (i < 10) {
                h = '0' + i
            } else {
                h = i.toString()
            }
            numList.push(h)
        }
        return numList
    }


    renderWheel = (pickerType) => {
        const width = (Constant.Screen_Width - Utils.getWidth(26)) / (this.pickerType === 'dateTime' ? 8 : 5)
        const showDateView = (pickerType === 'date' || pickerType === 'dateTime')
        const showTimeView = (pickerType === 'time' || pickerType === 'dateTime')

        return (<TouchView style={{flexDirection: 'row'}}>
            {showDateView && this.renderWheelItem(this.state.years, width, this.state.selectYearIndex, (index) => {
                this.changeDateTime({"yearIndex": index})
            })}
            {showDateView && this.showUnit && this.renderTextItem('年')}
            {showDateView && this.renderWheelItem(this.state.months, width, this.state.selectMonthsIndex, (index) => {
                this.changeDateTime({"monthsIndex": index})
            })}
            {showDateView && this.showUnit && this.renderTextItem('月')}
            {showDateView && this.renderWheelItem(this.state.days, width, this.state.selectDayIndex, (index) => {
                this.changeDateTime({"daysIndex": index})
            })}
            {showDateView && this.showUnit && this.showUnit && this.renderTextItem('日')}
            {showTimeView && this.renderWheelItem(this.state.hours, width, this.state.selectHoursIndex, (index) => {
                (this.pickerType === "time" ? this.changeTime : this.changeDateTime)({"hoursIndex": index})
            })}
            {showTimeView && this.showUnit && this.renderTextItem('时')}
            {showTimeView && this.renderWheelItem(this.state.minutes, width, this.state.selectMinutesIndex, (index) => {
                (this.pickerType === "time" ? this.changeTime : this.changeDateTime)({"minutesIndex": index})
            })}
            {showTimeView && this.showUnit && this.renderTextItem('分')}
            {showTimeView && this.renderWheelItem(this.state.seconds, width, this.state.selectSecondsIndex, (index) => {
                (this.pickerType === "time" ? this.changeTime : this.changeDateTime)({"secondsIndex": index})
            })}
            {showTimeView && this.showUnit && this.renderTextItem('秒')}
        </TouchView>)

    }
    renderTextItem = (text) => {
        return (<CustomButton buttonStyle={this.textViewStyle} textStyle={this.textStyle}>{text}</CustomButton>)
    }

    render() {
        return (
            <TouchView style={{
                backgroundColor: Colors.mainWhite,
                width: Constant.Screen_Width,
            }}>
                <TouchView style={{
                    paddingVertical: Utils.getHeight(8),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: Utils.getWidth(10),
                    alignItems: 'center',
                }}>
                    <CustomButton
                        textStyle={[{color: '#000'}, this.cancelTextStyle]}
                        bottonStyle={[{padding: 2}, this.cancelTouchStyle]}
                        onPress={this.onCancel}>
                        {this.cancelText}
                    </CustomButton>
                    <CustomButton textStyle={[{
                        padding: 10,
                        color: '#000',
                        fontSize: FontSize.textSize_16
                    }, this.titleTextStyle]}>{this.title}</CustomButton>
                    <CustomButton
                        textStyle={[{color: '#000'}, this.sureTextStyle]}
                        bottonStyle={[{padding: 2}, this.sureTouchStyle]}
                        onPress={() => {
                            this.props.onSure(this.returnSelect())
                        }}>
                        {this.sureText}
                    </CustomButton>
                </TouchView>
                <CenterView style={{
                    height: this.itemHeight * 6,
                    borderTopWidth: 1,
                    paddingTop: Utils.getHeight(10),
                    borderColor: Colors.black30
                }}>
                    {this.renderWheel(this.pickerType)}
                </CenterView>
            </TouchView>
        );
    }

    renderWheelItem = (list, width, index, selectValueIndex) => {
        if (list.length > 0) {
            return (<Wheel
                items={list}
                style={{height: this.itemHeight * 5, width: width}}
                itemStyle={{textAlign: 'center'}}
                index={index}
                onChange={(i) => {
                    return selectValueIndex(i)
                }}/>)
        }
    }
}