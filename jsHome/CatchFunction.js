exports.ErrorDo = function(data, name = "Error") {
    console.log(`${name} ${data}`);
}

exports.LogDo = function(data, name = "") {
    console.log(`${name} ${data}`);
}

exports.EmptyDo = function(data = "") {}