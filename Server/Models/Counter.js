import mongoose from "mongoose";

const CounterSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    seq:{
        type: Number,
        required: true
    }
});

const Counter = mongoose.model('Counter',CounterSchema);

export default Counter;