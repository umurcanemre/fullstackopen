const Filter = ( {nameFilter, filterByName} ) => {
    const filterSubmit = (event) => event.preventDefault() 
    return (
        <form>
            <div>
                filter name: <input value={nameFilter} onChange={filterByName} onSubmit={filterSubmit} />
            </div>
        </form>
    )
}

export default Filter