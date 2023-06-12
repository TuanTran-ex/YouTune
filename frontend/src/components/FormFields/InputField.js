import { TextField } from '@mui/material';
import { useController } from 'react-hook-form';

export function InputField({ name, control, label, ...inputProps }) {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    });
    return (
        <TextField
            fullWidth
            size="small"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            label={label}
            variant="outlined"
            inputRef={ref}
            error={invalid}
            helperText={error?.message}
            inputProps={inputProps}
        ></TextField>
    );
}
