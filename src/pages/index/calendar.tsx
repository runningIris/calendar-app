import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd } from '@src/actions/counter'
import './index.less';

class Calendar {
    constructor() {
        this.setCurrentTime();
    }
    showCurrentMonth() {
        let currentMonth = [this.getTime(this.currentTime)];
        let time = this.currentTime;

        while (this.getTime(time).date > 1) {
            time = new Date(time.getTime() - 24 * 60 * 60 * 1000);
            currentMonth = [this.getTime(time), ...currentMonth];
        }
        while (this.getTime(time).day > 0) {
            time = new Date(time.getTime() - 24 * 60 * 60 * 1000);
            currentMonth = [this.getTime(time), ...currentMonth];
        }
        return currentMonth;
    }
    setCurrentTime() {
        this.currentTime = new window.Date();
    }
    getTime(time) {
        return {
            year: time.getYear(),
            month: time.getMonth()+1,
            date: time.getDate(),
            day: time.getDay(),
            hour: time.getHours(),
            minite: time.getMinutes(),
            second: time.getSeconds()
        };
    }
    getPrevDay(time) {

    }
}
