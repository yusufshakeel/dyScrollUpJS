/*!
 * dyScrollUpJS is a JavaScript plugin to create a button to scroll back
 * to the top of the page.
 *
 * Author: Yusuf Shakeel
 * https://github.com/yusufshakeel
 *
 * GitHub Link: https://github.com/yusufshakeel/dyScrollUpJS
 *
 * MIT license
 * Copyright (c) 2016 Yusuf Shakeel
 *
 * Date: 2015-03-21 Saturday
 */
/*! dyScrollUpJS | (c) 2016 Yusuf Shakeel | https://github.com/yusufshakeel/dyScrollUpJS */
(function (global, $) {

    "use strict";

    var
        //this will be used by the user.
        dyscrollup = {};

    //default option
    dyscrollup.option = {
        showafter: '300',
        scrolldelay: '500',
        position: 'right',
        image: "",
        shape: 'circle',
        width: 32,
        height: 32
    };


    /**
     * this function will extend source object with defaults object.
     *
     * @param object source     this is the source object
     * @param object defaults   this is the default object
     * @return object
     */
    function extendSource(source, defaults) {
        var property;
        for (property in defaults) {
            if (source.hasOwnProperty(property) === false) {
                source[property] = defaults[property];
            }
        }
        return source;
    }

    /**
     * this function will configure and initialize.
     *
     * option = {
     *  showafter : "integer"   //(optional) default: 300, show btn after scolling X px down
     *  scrolldelay : "intwger" //(optional) default: 500, delay the scrolling up action in milliseconds
     *  position : "string"     //(optional) values: "left|right" default: "right"
     *  image : "string"        //(optional) values: "path of the image" default: ''
     *  shape : "string"        //(optional) values: "other|circle" default: "circle"
     *  width : "integer"       //(optional) default: 32
     *  height : "integer"      //(optional) default: 32
     * }
     *
     * @param object option     user preferences
     */
    dyscrollup.init = function (option) {
        if (typeof option !== "undefined") {
            this.option = extendSource(option, this.option);
        }
        this.createBtn();
        this.onscroll();
        this.onclick();
    };

    dyscrollup.createBtn = function () {
        var
            self = this,
            html, btn, img;

        //add the button
        html = "<div id='dyscrollup-btn'></div>";
        $("body").prepend(html);

        //set position
        btn = $("#dyscrollup-btn");
        switch (self.option.position) {
            case 'left':
                btn.css('left', '32px');
                break;

            case 'right':
                btn.css('right', '32px');
                break;
        }

        //set image
        if (self.option.image.length > 0) {
            btn.css('background', 'url(' + self.option.image + ') center center no-repeat');
        } else {
            btn.css({
                'background-color': 'rgba(0,0,0,1)',
                'color': '#fff',
                'text-align': 'center',
                'font-size': '20px'
            }).html('&#8593;');
        }
        //set shape
        btn = $("#dyscrollup-btn");
        if (self.option.shape === 'circle') {
            btn.css('border-radius', '50%');
        }

        //set dimension
        btn.css('width', self.option.width)
            .css('height', self.option.height);
    };

    dyscrollup.onclick = function () {
        var
            self = this;

        $("body").on("click", "#dyscrollup-btn", function (e) {
            e.preventDefault();
            if (!$(this).hasClass("click-locked")) {
                $("html, body").animate({
                    scrollTop: 0
                }, self.option.scrolldelay);
                $(this).addClass("click-locked");
            }
            return false;
        });
    };

    dyscrollup.onscroll = function () {
        var
            self = this;

        $(window).on("scroll", function (e) {
            if ($(window).scrollTop() > self.option.showafter) {
                $('#dyscrollup-btn')
                    .fadeIn();
            } else {
                $('#dyscrollup-btn')
                    .fadeOut()
                    .removeClass("click-locked");
            }
        });
    };

    //attach to global window object
    global.dyscrollup = dyscrollup;

}(typeof window !== "undefined" ? window : this,
    typeof jQuery !== "undefined" ? jQuery : undefined));
