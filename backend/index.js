const express = require("express");
const cookieParser = require("cookie-parser")
const cors = require("cors");
const connectDb = require("./uttils/db.js")
const dotenv = require("dotenv");
const path = require("path");

// Routes import
const userRoute = require("./routes/user.routes.js")
const companyRoute = require("./routes/company.routes.js")
const JobRoute = require('./routes/jobs.route.js');
const applicationRoute = require('./routes/application.route.js');

dotenv.config({});
connectDb();
const PORT = process.env.PORT || 3000;
const app = express();
// mongodb+srv://yashupar81:2T1fh5Y5az06wXbD@cluster0.lfnnqdd.mongodb.net/


const _dirname = path.resolve();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}

app.use(cors(corsOptions));


//Backend Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", JobRoute);
app.use("/api/v1/application", applicationRoute);

app.use(express.static(path.join(_dirname,"/frontend/dist")));
app.get('*',(_, res)=>{
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
})

app.listen(PORT, ()=> {
    console.log(`Server running at port ${PORT}`)
})
