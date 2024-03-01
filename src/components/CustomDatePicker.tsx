import { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";

interface CustomDatePickerProps {
  date: DateObject[];
  onChange: (dates: DateObject[]) => void;
}

export default function CustomDatePicker({
  date,
  onChange,
}: CustomDatePickerProps) {
  const [selectDate, setSelectDate] = useState<DateObject[]>(date || []);

  const onDateChange = (evtDate: DateObject[]) => {
    setSelectDate(evtDate);
  };

  const handleClick = (text: any) => {
    if (text === "close") {
      setSelectDate([]);
      onChange([]);
    } else {
      onChange(selectDate);
    }
  };

  return (
    <DatePicker
      range={true}
      value={selectDate}
      numberOfMonths={2}
      dateSeparator=" to "
      placeholder="Start & End Date"
      onChange={onDateChange}
      containerStyle={{ width: "100%" }}
      minDate={new Date()}
      plugins={[
        <Toolbar key="customToolbar" position="bottom" onApply={handleClick} />,
      ]}
    />
  );
}

// interface ToolbarProps {
//   position: string;
//   datePickerProps?: any;
//   calendarProps?: any;
//   onApply: (text?: string) => void;
//   DatePicker: any;
// }

function Toolbar({
  position,
  datePickerProps,
  calendarProps,
  onApply,
  DatePicker,
}: any) {
  const props = datePickerProps || calendarProps;

  const handleApplyClick = () => {
    onApply();
    DatePicker.closeCalendar();
  };

  const handlecloseClick = () => {
    onApply("close");
    DatePicker.closeCalendar();
  };

  return (
    <div className="drp-bottom-box">
      <span className="drp-selected">
        {props?.value[0]?.format()}{" "}
        {props?.value[1]?.format() && ` to ${props?.value[1]?.format()}`}
      </span>

      <button
        className="cancelBtn btn btn-sm btn-default"
        type="button"
        onClick={handlecloseClick}
      >
        cancel
      </button>
      <div
        className="applyBtn-date applyBtn btn btn-sm btn-primary"
        onClick={handleApplyClick}
      >
        Apply
      </div>
    </div>
  );
}
