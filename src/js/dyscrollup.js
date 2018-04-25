/*!
 * dyScrollUpJS is a JavaScript plugin to create a button to scroll back
 * to the top of the page.
 *
 * Author: Yusuf Shakeel
 * https://github.com/yusufshakeel
 *
 * GitHub Link: https://github.com/yusufshakeel/dyScrollUpJS
 *
 * MIT License
 * Copyright (c) 2016 Yusuf Shakeel
 *
 * Date: 2015-03-21 Saturday
 */
var dyscrollup = {
    // ID of the button
    btnID: 'dyscrollup-btn',
    // Default options
    option: {
        showafter: 300,
        scrolldelay: 500,
        position: 'right',
        image: "",
        shape: 'circle',
        width: 32,
        height: 32
    },
    /**
     * This function will extend 'source' object with 'defaults' object.
     *
     * @param source    This is the source object
     * @param defaults  This is the default object
     * @returns {object}
     */
    extendSource: function (source, defaults) {
        var property;
        for (property in defaults) {
            if (source.hasOwnProperty(property) === false) {
                source[property] = defaults[property];
            }
        }
        return source;
    },
    /**
     * This function will configure and initialize the button.
     *
     * option = {
     *  showafter : "integer"   // (optional) default: 300, show the button after scolling X pixels down.
     *  scrolldelay : "integer" // (optional) default: 500, delay the scrolling up action in milliseconds
     *  position : "string"     // (optional) values: "left|right" default: "right"
     *  image : "string"        // (optional) values: "path of the image" default: ""
     *  shape : "string"        // (optional) values: "other|circle" default: "circle"
     *  width : "integer"       // (optional) default: 32
     *  height : "integer"      // (optional) default: 32
     * }
     *
     * @param option     User preferences
     */
    init: function (option) {
        var self = this;
        if (typeof option !== "undefined") {
            self.option = self.extendSource(option, self.option);
        }
        self.createBtn();
        self.onscroll();
        self.onclick();
    },
    /**
     * This will create the button.
     */
    createBtn: function () {
        var self = this, btn;
        // Add the button
        btn = document.createElement('div');
        btn.setAttribute('id', self.btnID);
        document.body.appendChild(btn);
        // Now get the button by id
        btn = document.getElementById(self.btnID);
        // Set the common style
        btn.style.zIndex = 999999;
        btn.style.position = 'fixed';
        btn.style.cursor = 'pointer';
        btn.style.display = 'none';
        btn.style.bottom = '32px';
        // Set position
        switch (self.option.position) {
            case 'left':
                btn.style.left = '32px';
                break;
            case 'right':
                btn.style.right = '32px';
                break;
        }
        // Set image
        if (self.option.image.length > 0) {
            btn.style.background = 'url(' + self.option.image + ') center center no-repeat';
        }
        else {
            // If image not defined
            // then, create default button
            btn.style.backgroundColor = 'rgba(0,0,0,1)';
            btn.style.color = '#fff';
            btn.style.textAlign = 'center';
            btn.style.fontSize = '20px';
            btn.innerHTML = '&#8593;';
            btn.style.userSelect = 'none';
            btn.style.msUserSelect = 'none';
            btn.style.webkitUserSelect = 'none';
        }
        // Set shape
        if (self.option.shape === 'circle') {
            btn.style.borderRadius = '50%';
        }
        // Set dimension
        btn.style.width = self.option.width + 'px';
        btn.style.height = self.option.height + 'px';
        // Show the button if required
        if (document.body.scrollTop > self.option.showafter || document.documentElement.scrollTop > self.option.showafter) {
            btn.style.display = 'block';
        }
        else {
            btn.style.display = 'none';
        }
    },
    /**
     * This will scroll the page back to top.
     */
    onscroll: function () {
        var self = this, btn = document.getElementById(self.btnID);
        window.onscroll = function () {
            if (document.body.scrollTop > self.option.showafter || document.documentElement.scrollTop > self.option.showafter) {
                // Show the button if not yet visible
                if (btn.style.display === 'none') {
                    self.fadeIn(btn);
                }
                // If page is not scrolling back to the top after clicking
                // the dyscrollup-btn then remove the click lock
                if (!btn.classList.contains('dyscrollup-btn-scrolling')) {
                    btn.classList.remove('click-locked');
                }
            }
            else {
                // Hide the button when approaching the top
                if (btn.style.display !== 'none') {
                    self.fadeOut(btn);
                }
                // Remove the click lock
                btn.classList.remove('click-locked');
            }
        };
    },
    /**
     * This handles the click event.
     */
    onclick: function () {
        var self = this, btn = document.getElementById(self.btnID);
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            if (!btn.classList.contains('click-locked')) {
                self.animate();
                btn.classList.add('click-locked');
            }
            return false;
        });
    },
    /**
     * This will fadeIn the element.
     * @param element
     */
    fadeIn: function (element) {
        element.style.display = 'block';
    },
    /**
     * This will fadeOut the element.
     * @param element
     */
    fadeOut: function (element) {
        element.style.display = 'none';
    },
    /**
     * This will animate the scroll up.
     */
    animate: function () {
        var self = this;
        // Get the button
        var btn = document.getElementById(self.btnID);
        // Find the distance that needs to be traversed to reach back to the top
        var distance = document.body.scrollTop || document.documentElement.scrollTop;
        // Divide the journey into N parts
        var divider = 50;
        // Compute the time interval for each N parts
        var intervalTimeout = self.option.scrolldelay / divider;
        // Compute the distance to travel for each N parts
        var travel = Number((distance * intervalTimeout) / self.option.scrolldelay);
        // If the time interval for each N parts is less than 1 ms
        // then, jump straight to top
        if (intervalTimeout < 1) {
            intervalTimeout = 1;
            travel = distance;
        }
        // Set the interval
        var intervalfn = setInterval(scrollUpdate, intervalTimeout);
        function scrollUpdate() {
            // Still scrolling
            btn.classList.add('dyscrollup-btn-scrolling');
            distance -= travel;
            document.body.scrollTop = distance;
            document.documentElement.scrollTop = distance;
            // Scrolling complete
            if (distance <= 0) {
                clearInterval(intervalfn);
                btn.classList.remove('dyscrollup-btn-scrolling');
            }
        }
    }
};
