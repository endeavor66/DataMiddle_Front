import {get} from './http'
import {post} from './http'



//数据中台
/**
 * (1) 登录
 */
export const login = (obj,msg) => post("/login",msg,obj);

/**
 * (2)获取门店信息
 */
export const getShopInfo = (obj,msg) => get("/getShopInfo",msg,obj);

/**
 * (3)获取推荐的商品清单
 */
export const getRecommendProduct = (obj,msg) => get("/getRecommendProduct",msg,obj);


/**
 * (4)根据商品id获取预测销量信息
 */
export const getPredictSales = (obj,msg) => get("/getPredictSales",msg,obj);

/**
 * (5)获取预测的商品退货率
 */
export const getPredictReturn = (obj,msg) => get("/getPredictReturn",msg,obj);

/**
 * (6)获取关联商品
 */

/**
 * (7)获取门店的预测总销量与实际总销量
 */
export const getAllPredictSales = (obj,msg) => get("/getAllPredictSales",msg,obj);

/**
 * (8)获取未来7日总的预测退货率
 */
export const getAllPredictReturn = (obj,msg) => get("/getAllPredictReturn",msg,obj);

/**
 * (9)获取所有门店的总览信息
 */
export const getAllShopInfo = (obj,msg) => get ("/getAllShopInfo",msg,obj);

export const importData = (obj,msg) => post ("/importData",msg,obj);

