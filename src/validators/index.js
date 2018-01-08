/**
 * Form Field Validators
 * @author Iman Kalyan Majumdar
 */
import moment from 'moment';

export const required = value => (value ? undefined : '*this field is required');

export const timeBeforePresent = (values) => {
    const currentTime = new moment().format("L");
    if (values < currentTime) { return 'End date cannot be in the past.'; }
    return false;
}

export const timeBeforeStart = (value, otherValue) => {
    if (value < otherValue.startTime) { return 'End time cannot be before start time.'; }
    return false;
}

export const timeAfterEnd = (value, otherValue) => {
    if (value > otherValue.endTime) { return 'Start time cannot be after end time.'; }
    return false;
}

export const url = (value) => {
  return value && !/((https|http?):\/\/)?(www\.)?[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?$/i.test(value) ? 'Invalid field' : undefined;
}

export const username = (value) => {
  return value && !/^[a-zA-Z0-9(._)]{7,25}$/i.test(value) ? 'Username must be between 7-25 characters long without special characters apart from "." and "_"' : undefined;
}

export const studentUniversityEmail = value => {
  return value && !/^s{1}([0-9]){7}@ed.ac.uk$/i.test(value) ? 'Invalid email address' : undefined;
}

export const otherUniversityEmail = value => {
  return value && !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@ed.ac.uk$/i.test(value) ? 'Invalid email address' : undefined;
}

export const otherEmail = value => {
  return value && !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(value) ? 'Invalid email address' : undefined;
}

export const mandatoryCheckbox = value => {
  return value ? undefined : "You must accept the terms and conditions";
}

// const email = value =>
//   value && !
//   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(value) ?
//   'Invalid email address' : undefined;
