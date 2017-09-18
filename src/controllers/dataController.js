export default {
    // public props
    salario: 0,
    // public methods
    checkData(step){
        let ret = false;
        switch(step){
            case 0:
                ret = this.salario > 0;
            break;
            default:
                ret = false;
        }
        return ret;
    }
};