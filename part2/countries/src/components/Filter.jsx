
const Filter = ({filter, onChange}) => {

    return (
        <div>
            find countries
            <span> </span>
            <input type="form" value={filter} onChange={onChange}></input>
        </div>
    )
}

export default Filter