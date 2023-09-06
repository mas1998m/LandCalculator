function calculate(country,type,area,unit){

if(country =="egypt"){

    if(["industrial", "resident", "commercial"].includes(type)){
        return area * 1.04 * 3850;
    }else{
        return area * 1.14 * 19500;
    }

}else if(country =="ksa"){
    if(type != "agriculture"){
        return area * 3000 ;
    }else{
        if(unit == "acre"){
            return area * 150000;
        }
        else{
            return area * 150000 / 4200.83;
        }
    }
}else if(country =="bahrain"){
    return area * 500;

}else if(country =="oman"){
    if(unit == "acre"){
        return area * 500 * 4200.83;
    }
    else{
        return area * 500;
    }
}else if(country =="kuwait"){
    return area * 500;

}else if(country =="lebanon"){
    return area * 500;
}else if(country =="morocco"){
    if(type != "agriculture"){
        return area * 6000 ;
    }else{
        if(unit == "hectare"){
            return area * 160000;
        }
        else{
            return area * 160000 / 10000;
        }
    }
}else if(country =="qatar"){
    return area * 500 * 10.76;

}else if(country =="uae"){
    return area * 500;

}else if(country =="jordan"){
    if(unit == "donum"){
        return area * 500 * 1000;
    }else{
        return area * 500;
    }
}else if(country =="turkey"){
    return area * 500;
}
return 0;
}


module.exports = {
    calculate
};
