/* eslint-disable jsx-a11y/label-has-associated-control */
import { Checkbox, FormControl, FormControlLabel } from '@mui/material';

export const NormalCheckbox = (props) => {
  const {
    className = '',
    id = Math.random(),
    label = '',
    errorMessage = '',
    materialUi = true,
    checked = false
  } = props;

  return  (
    <div className="form-check">
    <label className="form-check-label">
      <input type="checkbox" className="form-check-input"/> {label} <i class="input-helper"></i></label>
  </div>
  );
};
