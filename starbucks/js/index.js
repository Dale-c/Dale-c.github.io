var w = $(document.body).width();
        if (w > 970) {
            $('.nav-box').attr("class", "nav-box nav-left");
            $('#nav .row').attr("class", "row header");
        }
        window.onresize = function () {

            var ww = $(document.body).width();
            if (ww < 970) {
                $('.nav-left').attr("class", "nav-box");
                $('.header').attr("class", "row");
            } else {
                $('.nav-box').attr("class", "nav-box nav-left");
                $('#nav .row').attr("class", "row header");
            }
            // if(w<768){
            //     $('.nav-box').attr("class","nav-small");
            // }
        }

        $('.xbk_4 .left').css('display', 'none')
        $('.left').click(function () {
            var ulleft = $('.xbk_4 ul').position().left - 90;
            $('.xbk_4 ul').animate({ left: ulleft + 365 + 'px' })
            $('.xbk_4 .right').css('display', 'block')
            $('.xbk_4 .left').css('display', 'none')
        })
        $('.right').click(function () {
            $('.xbk_4 ul').animate({ left: '-365px' })
            $('.xbk_4 .left').css('display', 'block')
            $('.xbk_4 .right').css('display', 'none')

        })
        $('.primary-mobile li div').eq(0).css('color' , '#00A862')
        $('img.active').eq(0).css('display' , 'block')
        $('.primary-mobile li').click(function(){
            var liIndex = $(this).index()
            $('.primary-mobile li div').eq(liIndex).css('color' , '#00A862')
            $(this).siblings().find('div').css('color' , '#0d0d0d')
            $(this).find('img.active').css('display' , 'block').siblings().css('display' , 'none')
            $(this).siblings().find('img.active').css('display' , 'none').siblings().css('display' , 'block')
        })