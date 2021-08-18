import moment from 'moment'
let formatDate = time =>{
    if (time = '' || !time){
        return '——'
    }else{
        var date = moment(time).format('YYYY-MM-DD');
        return date;                        
    }
}

export{formatDate}    