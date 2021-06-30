import './pagination.scss'
import $ from '../../lib/jquery-3.3.1.min'
class Pagination {
    constructor () {
        this.defaultOption = {
            container       : null,
            pageNum         : 1,
            pageRange       : 2,
            onSelectPage    : null
        }
        this._bindEvent()
    }
    _bindEvent () {
        const that = this
        // 事件委托
        $(document).on('click', '.pg-item', function(){
            let $this = $(this)
            // 对于active和disabled按钮点击，不做处理
            if($this.hasClass('active') || $this.hasClass('disabled')){
                return
            }
            typeof that.option.onSelectPage === 'function' 
                ? that.option.onSelectPage($this.data('value')) : null
        })
    }
    // 渲染
    render (userOption) {
        // 合并选项
        this.option = $.extend({}, this.defaultOption, userOption)
        // 判断容器是否为合法的jquery对象
        if(!(this.option.container instanceof $)){
            return
        }
        // 判断是否只有1页
        if(this.option.pages <= 1){
            return
        }
        // 渲染分页内容
        // alert(this.getPaginationHtml())
        this.option.container.html(this.getPaginationHtml())
    }
    // 获取分页的html, |上一页| 2 3 4 =5= 6 7 8|下一页|  5/9
    getPaginationHtml () {
        let html = '', pageArray = [],
            option = this.option,
            start = option.pageNum - option.pageRange > 0 ? option.pageNum - option.pageRange : 1,
            end = option.pageNum + option.pageRange < option.pages ? option.pageNum + option.pageRange : option.pages
        // 上一页按钮数据
        pageArray.push({
            name : '上一页',
            value : this.option.prePage,
            disabled : !this.option.hasPreviousPage,
            previousBtn : true
        })
        // 数字按钮处理
        for(let i = start; i <= end; i++){
            pageArray.push({
                name : i,
                value : i,
                active : (i === option.pageNum)
            })
        }
        // 下一页按钮数据
        pageArray.push({
            name : '下一页',
            value : this.option.nextPage,
            disabled : !this.option.hasNextPage,
            nextBtn : true
        })

        for(let i = 0, iLength = pageArray.length; i < iLength; i++) {
            if(pageArray[i].disabled) {
                html += `
                    <span class="pg-item ${pageArray[i].previousBtn ? 'previous' : ''}${pageArray[i].nextBtn ? 'next' : ''} disabled" data-value="${pageArray[i].value}">${pageArray[i].name}</span>
            `} else {
                if (pageArray[i].active) {
                    html += `
                        <span class="pg-item active" data-value="${pageArray[i].value}">${pageArray[i].name}</span>
                `} else {
                    html += `
                    <span class="pg-item ${pageArray[i].previousBtn ? 'previous' : ''}${pageArray[i].nextBtn ? 'next' : ''} " data-value="${pageArray[i].value}">${pageArray[i].name}</span>
                `}
            }
        }
        html += `<span class="pg-total">共${option.pages}页</span>`
        return html
    }
}
module.exports = Pagination