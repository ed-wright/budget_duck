import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';

import 'react-day-picker/lib/style.css';
import styles from '../../styles/DatePicker.css';

class DatePicker extends React.Component {
    
    constructor(props) {
        super(props);
        this.dayPickerInputRef = React.createRef();
    }

    // When date is changed call the onChange event in the parent element
    handleDateChange = () => {
        this.props.onChange(this.dayPickerInputRef.current.state.month);
    }

    // Given a date return the Monday of that week
    getMonday = (date) => {
        date = new Date(date);
        var day = date.getDay(),
            diff = date.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
        return new Date(date.setDate(diff));
    }

    parseDate = (str, format, locale) => {
        const parsed = dateFnsParse(str, format, new Date(), { locale });
        if (DateUtils.isDate(parsed)) {
          return parsed;
        }
        return undefined;
    }

    formatDate = (date, format, locale) => {
        return dateFnsFormat(date, format, { locale });
    }

    render() {
        const FORMAT = "dd/MM/yyyy";
        return (
            <DayPickerInput
                ref={this.dayPickerInputRef}
                keepFocus={false}
                value={this.getMonday(this.props.date)}
                formatDate={this.formatDate}
                format={FORMAT}
                parseDate={this.parseDate}
                inputProps={{
                    readOnly: 'readonly'
                }}
                dayPickerProps={{
                    firstDayOfWeek: 1,
                    disabledDays: [date => date.getDay() != 1, date => date > new Date()],
                    toMonth: new Date(),
                    showOutsideDays: true,
                    modifiers: {
                        disabled: { daysOfWeek: [0, 2, 3, 4, 5, 6] }
                    },
                    todayButton: "Current Week"
                }}
                onDayChange={this.handleDateChange}
            />
        );
    }
}

export default DatePicker;