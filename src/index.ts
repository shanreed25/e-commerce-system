console.log("E-commerce System Starting.......");


fetch('https://dummyjson.com/products/1')
.then(res => {
    console.log(res.status);
    console.log(res.ok);
    const body = res.json();
    
    return body;
})
.then((body) => {
    console.log(body);
});