import { listRoutes } from '../route/route';

export async function getHomeSwiper() {
    const {
        records: routes,
    } = await listRoutes({
        pageNumber: 1,
        pageSize: 200})
    // 1. 复制原数组（避免修改原数据）
    // 2. 按 priority 从大到小排序
    const sortedRoutes = [...routes].sort((a, b) => {
        // 若 priority 相同，可按其他字段（如 id）辅助排序（可选）
        return b.priority - a.priority; // 核心：从大到小排序
    });
    // 3. 截取前3项（若数组长度不足3，会返回实际长度的元素）
    const top3 = sortedRoutes.slice(0, 3);
    // 3. 提取这3条路线的poster_image组成新数组
    const top3Posters = top3.map(route => {return {
        image: route.poster_image, 
        _id: route._id}});
    return top3Posters;
}
