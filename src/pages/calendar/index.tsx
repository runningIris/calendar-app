import { ComponentClass } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Text, Picker } from '@tarojs/components';

interface DateObject {
  date: Date,
  isCurrentMonth: boolean,
  isToday: boolean
}

enum Week {
  Sunday,
  Monday,
  TuesDay,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

class Calendar extends Component {
  constructor() {
    super();
    const today: Date = new Date();
    this.state = {
      currentMonth: [],
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      date: today.getDate(),
      day: today.getDay()
    };
    this.showCurrentMonth(today);
  }

  showCurrentMonth(today: Date) {
    let before: Date = today;
    let after: Date = Calendar.nextDate(today);
    let all: DateObject[] = [
      {
        date: today,
        isCurrentMonth: true,
        isToday: true
      }
    ];

    // 当前日子到月初
    while (before.getDate() > 1) {
      before = Calendar.prevDate(before);
      all = [
        {
          date: before,
          isCurrentMonth: true,
          isToday: false
        },
        ...all
      ];
    }
    // 如果月初之前还有些日子才到周一
    while (before.getDay() != 0) {
      before = Calendar.prevDate(before);
      all = [
        {
          date: before,
          isCurrentMonth: false,
          isToday: false
        },
        ...all
      ];
    }
    // 当前日子到月末
    while (after.getDate() != 1) {
      all = [
        ...all,
        {
          date: after,
          isCurrentMonth: true,
          isToday: false
        }
      ];
      after = Calendar.nextDate(after);
    }
    // 如果月末之后还有些日子才到周日
    while (after.getDay() != 0) {
      all = [
        ...all,
        {
          date: after,
          isCurrentMonth: false,
          isToday: false
        }
      ];
      after = Calendar.nextDate(after);
    }
    this.setState({
      currentMonth: all,
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      date: today.getDate(),
      day: today.getDay()
    });
  }

  render() {
    const { currentMonth, year, month, date, day } = this.state;
    return (
      <View style={{ textAlign: "center" }}>
        <Text>Calendar</Text>
        <View style={{ margin: "10px" }}>
          <Picker mode="date" onChange={e => this.showCurrentMonth(new Date(e.detail.value))}>
            <Text>{year}-{month}-{date} {Week[day]}</Text>
          </Picker>
          <Text onClick={() => this.showCurrentMonth(new Date())}>Back to Today</Text>
        </View>
        <View>
          {
            this.state.currentMonth.map((current, i) => {
              return (
                <View style={{ color: current.isCurrentMonth ? current.isToday ? "red" : "black" : "gray", display: "inline-block", width: "13vw" }} key={current.date.getTime()}>
                  <Text>{current.date.getDate()}</Text>
                </View>
              );
            }
          }
        </View>
      </View>
    )
  }
  static nextDate(date: Date) {
    return new Date(date.getTime() + 24 * 60 * 60 * 1000);
  }
  static prevDate(date: Date) {
    return new Date(date.getTime() - 24 * 60 * 60 * 1000);
  }
}
