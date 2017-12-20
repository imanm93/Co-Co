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
