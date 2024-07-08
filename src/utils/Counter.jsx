import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const Counter = ({label, value, onChange}) => (
  <>
    <p>{label}</p>
    <button onClick={() => value && onChange(value - 1)} >
      <RemoveOutlinedIcon />
    </button>
    <p className="text-center">{value}</p>
    <button onClick={() => onChange(value + 1)} >
      <AddOutlinedIcon />
    </button>
  </>
)

export default Counter