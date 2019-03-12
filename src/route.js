import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Main = () => import('views/Main')
const Login = () => import('views/Login')
const Home = () => import('views/home/home')
const Source = () => import('views/sourceManagement/source')
const Order = () => import('views/orderManagement/order')
// 体检管理
const View = () => import('views/physicalManagement/view')
const Register = () => import('views/physicalManagement/register')
const Printform = () => import('views/physicalManagement/print-form')
const Printcode = () => import('views/physicalManagement/print-code')
const Certification = () => import('views/physicalManagement/certification')
// 体检检查
const Sign = () => import('views/physicalExamination/sign')
const XRays = () => import('views/physicalExamination/x-rays')
const AnalSwab = () => import('views/physicalExamination/anal-swab')
const Blood = () => import('views/physicalExamination/blood')
//检查管理
const AnalSwabIn = () => import('views/inspectionManagement/anal-swab-in')
const AnalSwabAudit = () => import('views/inspectionManagement/anal-swab-audit')
const BloodIn = () => import('views/inspectionManagement/blood-in')
const BloodAudit = () => import('views/inspectionManagement/blood-audit')
//报表管理
const CertificationTb = () => import('views/reportManagement/certification-tb')
// 权限管理
const Role = () => import('views/systemPermissions/role')
const Account = () => import('views/systemPermissions/account')

const routes = [
    { path: '/', redirect: '/login' },
    {
        path: '/home',
        component: Main,
        redirect: '/login',
        children: [
            { path: '/home', component: Home },
            { path: '/source', component: Source },
            { path: '/order', component: Order },
            { path: '/view', component: View },
            { path: '/register', component: Register },
            { path: '/printform', component: Printform },
            { path: '/printcode', component: Printcode },
            { path: '/certification', component: Certification },
            { path: '/sign', component: Sign },
            { path: '/xrays', component: XRays },
            { path: '/analswab', component: AnalSwab },
            { path: '/blood', component: Blood },
            { path: '/analswabin', component: AnalSwabIn },
            { path: '/analswabaudit', component: AnalSwabAudit },
            { path: '/bloodin', component: BloodIn },
            { path: '/bloodaudit', component: BloodAudit },
            { path: '/certificationtb', component: CertificationTb },
            { path: '/role', component: Role },
            { path: '/account', component: Account }
        ],
    },
    { path: '/login', component: Login, }
]
const router = new Router({
    mode: 'history',
    routes
})

export { router, menus }
