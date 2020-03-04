let cache = [];
function deepClone(source){
    if(source instanceof Object){
        let cacheDist = findCache(source)
        if(cacheDist){
            console.log("有缓存")
            return cacheDist;
        }else{
            console.log("没缓存")
            let dist;
            if(source instanceof Array){
                dist = new Array();
            } else if(source instanceof Function){
                dist = function(){
                    return source.apply(this,arguments);
                }
            }else{
                dist = new Object();
            }
            // 数据源 和 副本 都存入缓存 ，注意一定要 在 dist创建成功之后就把它 存入，防止重复的生成
            cache.push([source,dist])
            for(let key in source){
                dist[key] = deepClone(source[key]);
            }
            return dist;
        }
    }
    return source;
}

function findCache(source){
    for(let i=0;i<cache.length;i++){
        if(cache[i][0] === source){
            return cache[i][1];
        }
    }
    return undefined
}

module.exports = deepClone;