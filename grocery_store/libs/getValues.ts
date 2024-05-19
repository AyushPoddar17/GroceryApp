function getValue(a){
    if(typeof a =="string")
        return `"${a}"`
    return a;

}

export default getValue;