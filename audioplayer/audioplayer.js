var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.findInternal = function(c, f, v) {
    c instanceof String && (c = String(c));
    for (var p = c.length, a = 0; a < p; a++) {
        var e = c[a];
        if (f.call(v, e, a, c))
            return {
                i: a,
                v: e
            }
    }
    return {
        i: -1,
        v: void 0
    }
}
;
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(c, f, v) {
    c != Array.prototype && c != Object.prototype && (c[f] = v.value)
}
;
$jscomp.getGlobal = function(c) {
    return "undefined" != typeof window && window === c ? c : "undefined" != typeof global && null != global ? global : c
}
;
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(c, f, v, p) {
    if (f) {
        v = $jscomp.global;
        c = c.split(".");
        for (p = 0; p < c.length - 1; p++) {
            var a = c[p];
            a in v || (v[a] = {});
            v = v[a]
        }
        c = c[c.length - 1];
        p = v[c];
        f = f(p);
        f != p && null != f && $jscomp.defineProperty(v, c, {
            configurable: !0,
            writable: !0,
            value: f
        })
    }
}
;
$jscomp.polyfill("Array.prototype.find", function(c) {
    return c ? c : function(c, v) {
        return $jscomp.findInternal(this, c, v).v
    }
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.fill", function(c) {
    return c ? c : function(c, v, p) {
        var a = this.length || 0;
        0 > v && (v = Math.max(0, a + v));
        if (null == p || p > a)
            p = a;
        p = Number(p);
        0 > p && (p = Math.max(0, a + p));
        for (v = Number(v || 0); v < p; v++)
            this[v] = c;
        return this
    }
}, "es6", "es3");
$jscomp.owns = function(c, f) {
    return Object.prototype.hasOwnProperty.call(c, f)
}
;
$jscomp.assign = "function" == typeof Object.assign ? Object.assign : function(c, f) {
    for (var v = 1; v < arguments.length; v++) {
        var p = arguments[v];
        if (p)
            for (var a in p)
                $jscomp.owns(p, a) && (c[a] = p[a])
    }
    return c
}
;
$jscomp.polyfill("Object.assign", function(c) {
    return c || $jscomp.assign
}, "es6", "es3");
window.dzsap_init_calls || (window.dzsap_init_calls = []);
function dzsap_is_mobile() {
    return is_ios() || is_android_good()
}
function is_ios() {
    return -1 != navigator.platform.indexOf("iPhone") || -1 != navigator.platform.indexOf("iPod") || -1 != navigator.platform.indexOf("iPad")
}
function is_android() {
    return is_android_good()
}
function is_android_good() {
    return -1 < navigator.userAgent.toLowerCase().indexOf("android")
}
function dzsap_generate_keyboard_tooltip(c, f) {
    c = '<span class="dzstooltip arrow-from-start transition-slidein arrow-bottom skin-black" style="width: auto;  white-space:nowrap;">Shortcut: ' + c[f] + "</span>";
    c = c.replace("32", "space");
    return c = c.replace("27", "escape")
}
function dzsap_generate_keyboard_controls() {
    var c = {
        play_trigger_step_back: "off",
        step_back_amount: "5",
        step_back: "37",
        step_forward: "39",
        sync_players_goto_next: "",
        sync_players_goto_prev: "",
        pause_play: "32",
        show_tooltips: "off"
    };
    window.dzsap_keyboard_controls && (c = jQuery.extend(c, window.dzsap_keyboard_controls));
    c.step_back_amount = Number(c.step_back_amount);
    return c
}
function htmlEncode(c) {
    return jQuery("<div/>").text(c).html()
}
function htmlDecode(c) {
    return jQuery("<div/>").html(arg).text()
}
var dzsap_list = []
  , dzsap_yt_list = []
  , dzsap_ytapiloaded = !1
  , dzsap_globalidind = 20
  , dzsap_list_for_sync_sw_built = !1
  , dzsap_list_for_sync_inter_build = 0;
window.loading_multi_sharer = !1;
window.dzsap_moving_playlist_item = !1;
window.dzsap_playlist_con = null;
window.dzsap_playlist_item_moving = null;
window.dzsap_playlist_item_target = null;
window.dzsap_player_interrupted_by_dzsap = null;
window.dzsap_audio_ctx = null;
window.dzsap__style = null;
window.dzsap_sticktobottom_con = null;
window.dzsap_self_options = {};
window.dzsap_generating_pcm = !1;
window.dzsap_box_main_con = null;
window.dzsap_lasto = null;
window.dzsap_wavesurfer_load_attempt = 0;
window.dzsap_list_for_sync_players = [];
window.dzsap_player_index = 0;
function register_dzsap_plugin() {
    (function(c) {
        function f(a, c) {
            a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
            var e = "";
            a && (a = {
                r: parseInt(a[1], 16),
                g: parseInt(a[2], 16),
                b: parseInt(a[3], 16)
            },
            e = 1,
            c && (e = c),
            e = "rgba(" + a.r + "," + a.g + "," + a.b + "," + e + ")");
            return e
        }
        window.dzsap_list_for_sync_build = function() {}
        ;
        Math.easeOutQuart = function(a, c, f, k) {
            a /= k;
            a--;
            return -f * (a * a * a * a - 1) + c
        }
        ;
        Math.easeOutQuad = function(a, c, f, k) {
            return -f * a / k * (a / k - 2) + c
        }
        ;
        Math.easeIn = function(a, c, f, k) {
            return -f * (a /= k) * (a - 2) + c
        }
        ;
        Math.easeOutQuad = function(a, c, f, k) {
            return -f * a / k * (a / k - 2) + c
        }
        ;
        Math.easeOutQuad_rev = function(a, c, f, k) {
            return (f * k + k * Math.sqrt(f * (f + c - a))) / f
        }
        ;
        var v = '<svg version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px" height="30px" viewBox="0 0 25 30" xml:space="preserve"> <path d="M24.156,13.195L2.406,0.25C2.141,0.094,1.867,0,1.555,0C0.703,0,0.008,0.703,0.008,1.562H0v26.875h0.008 C0.008,29.297,0.703,30,1.555,30c0.32,0,0.586-0.109,0.875-0.266l21.727-12.93C24.672,16.375,25,15.727,25,15 S24.672,13.633,24.156,13.195z"/> </svg>'
          , p = '<svg version="1.2" baseProfile="tiny" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px" height="30px" viewBox="0 0 25 30" xml:space="preserve"> <path d="M9.812,29.7c0,0.166-0.178,0.3-0.398,0.3H2.461c-0.22,0-0.398-0.134-0.398-0.3V0.3c0-0.166,0.178-0.3,0.398-0.3h6.953 c0.22,0,0.398,0.134,0.398,0.3V29.7z"/> <path d="M23.188,29.7c0,0.166-0.178,0.3-0.398,0.3h-6.953c-0.22,0-0.398-0.134-0.398-0.3V0.3c0-0.166,0.178-0.3,0.398-0.3h6.953 c0.22,0,0.398,0.134,0.398,0.3V29.7z"/> </svg>';
        c.fn.prependOnce = function(a, e) {
            var f = c(this);
            if ("undefined" == typeof e) {
                var k = /class="(.*?)"/.exec(a);
                "undefined" != typeof k[1] && (e = "." + k[1])
            }
            return 1 > f.children(e).length ? (f.prepend(a),
            !0) : !1
        }
        ;
        c.fn.appendOnce = function(a, e) {
            var f = c(this);
            if ("undefined" == typeof e) {
                var k = /class="(.*?)"/.exec(a);
                "undefined" != typeof k[1] && (e = "." + k[1])
            }
            return 1 > f.children(e).length ? (f.append(a),
            !0) : !1
        }
        ;
        c.fn.audioplayer = function(a) {
            if ("undefined" == typeof a && c(this).attr("data-options")) {
                var e = c(this).attr("data-options");
                e = "window.dzsap_self_options  = " + e;
                try {
                    eval(e)
                } catch (W) {
                    console.warn("eval error", W)
                }
                a = c.extend({}, window.dzsap_self_options);
                window.window.dzsap_self_options = c.extend({}, {})
            }
            a = c.extend({
                design_skin: "skin-default",
                autoplay: "off",
                call_from: "default",
                autoplay_on_scrub_click: "off",
                cue: "on",
                preload_method: "metadata",
                loop: "off",
                pause_method: "pause",
                settings_extrahtml: "",
                settings_extrahtml_after_artist: "",
                settings_extrahtml_in_float_left: "",
                settings_extrahtml_in_float_right: "",
                settings_extrahtml_before_play_pause: "",
                settings_extrahtml_after_play_pause: "",
                settings_trigger_resize: "0",
                design_thumbh: "default",
                extra_classes_player: "",
                disable_volume: "default",
                disable_scrub: "default",
                disable_timer: "default",
                disable_player_navigation: "off",
                scrub_show_scrub_time: "on",
                player_navigation: "default",
                type: "audio",
                enable_embed_button: "off",
                embed_code: "",
                skinwave_dynamicwaves: "off",
                soundcloud_apikey: "",
                parentgallery: null,
                skinwave_enableSpectrum: "off",
                skinwave_enableReflect: "on",
                skinwave_place_thumb_after_volume: "off",
                skinwave_place_metaartist_after_volume: "off",
                settings_useflashplayer: "auto",
                skinwave_spectrummultiplier: "1",
                settings_php_handler: "",
                php_retriever: "soundcloudretriever.php",
                skinwave_mode: "normal",
                skinwave_wave_mode: "canvas",
                skinwave_wave_mode_canvas_mode: "normal",
                skinwave_wave_mode_canvas_normalize: "on",
                skinwave_wave_mode_canvas_waves_number: "3",
                skinwave_wave_mode_canvas_waves_padding: "1",
                skinwave_wave_mode_canvas_reflection_size: "0.25",
                pcm_data_try_to_generate: "off",
                pcm_data_try_to_generate_wait_for_real_pcm: "off",
                pcm_notice: "off",
                notice_no_media: "on",
                skinwave_comments_links_to: "",
                skinwave_comments_enable: "off",
                skinwave_comments_mode_outer_selector: "",
                skinwave_comments_playerid: "",
                skinwave_comments_account: "none",
                skinwave_comments_process_in_php: "on",
                mobile_delete: "off",
                footer_btn_playlist: "off",
                mobile_disable_fakeplayer: "off",
                skinwave_comments_retrievefromajax: "off",
                skinwave_preloader_code: "default",
                skinwave_comments_displayontime: "on",
                skinwave_comments_avatar: "http://www.gravatar.com/avatar/00000000000000000000000000000000?s=20",
                skinwave_comments_allow_post_if_not_logged_in: "on",
                skinwave_timer_static: "off",
                default_volume: "default",
                volume_from_gallery: "",
                design_menu_show_player_state_button: "off",
                playfrom: "off",
                design_animateplaypause: "default",
                embedded: "off",
                embedded_iframe_id: "",
                sample_time_start: "",
                sample_time_end: "",
                sample_time_total: "",
                google_analytics_send_play_event: "off",
                fakeplayer: null,
                failsafe_repair_media_element: "",
                action_audio_play: null,
                action_audio_play2: null,
                action_audio_pause: null,
                action_audio_end: null,
                action_audio_comment: null,
                action_received_time_total: null,
                action_audio_change_media: null,
                action_audio_loaded_metadata: null,
                action_video_contor_60secs: null,
                type_audio_stop_buffer_on_unfocus: "off",
                construct_player_list_for_sync: "off",
                settings_exclude_from_list: "off",
                design_wave_color_bg: "222222",
                design_wave_color_progress: "ea8c52",
                skin_minimal_button_size: "100",
                gallery_gapless_play: "off",
                preview_on_hover: "off",
                watermark_volume: "1",
                controls_external_scrubbar: "",
                scrubbar_type: "auto",
                wavesurfer_pcm_length: "200"
            }, a);
            this.each(function() {
                function W() {
                    Xa = Z = ma = aa = 0;
                    a.sample_time_start || (b.attr("data-sample_time_start") && (aa = Number(b.attr("data-sample_time_start"))),
                    b.attr("data-sample_time_end") && (eb = Number(b.attr("data-sample_time_end"))),
                    b.attr("data-pseudo-sample_time_start") && (Z = Number(b.attr("data-pseudo-sample_time_start"))),
                    b.attr("data-pseudo-sample_time_end") && (Xa = Number(b.attr("data-pseudo-sample_time_end"))),
                    b.attr("data-sample_time_total") && (ma = Number(b.attr("data-sample_time_total"))));
                    0 == isNaN(Number(a.sample_time_start)) && 0 < Number(a.sample_time_start) && (aa = Number(a.sample_time_start),
                    0 < Number(a.sample_time_end) && (eb = Number(a.sample_time_end),
                    0 < Number(a.sample_time_total) && (ma = Number(a.sample_time_total),
                    Cc = aa / ma,
                    dc = eb / ma)));
                    Z && (aa = Z,
                    eb = Xa);
                    ec = ma && aa || Z && Xa ? !0 : !1
                }
                function k() {
                    var d = b.attr("data-source");
                    "shoutcast" == na && (d = add_query_arg(a.settings_php_handler, "action", "dzsap_shoutcast_get_streamtitle"),
                    d = add_query_arg(d, "source", Ya));
                    c.ajax({
                        type: "GET",
                        url: d,
                        crossDomain: !0,
                        success: function(a) {
                            a.documentElement && a.documentElement.innerHTML && (a = a.documentElement.innerHTML);
                            var b = ""
                              , d = "";
                            "icecast" == na && (e = /<location>(.*?)<\/location>/g.exec(a)) && (console.log(" aux - ", e),
                            e[1] != xa && (xa = e[1],
                            Da()));
                            if (nb) {
                                if ("icecast" == na) {
                                    var c = /<title>(.*?)<\/title>/g;
                                    if (e = c.exec(a))
                                        b = e[1]
                                }
                                "shoutcast" == na && (b = a)
                            }
                            ob && "icecast" == na && (c = /<creator>(.*?)<\/creator>/g,
                            e = c.exec(a)) && (d = e[1]);
                            nb && A.find(".the-name").html(b);
                            ob && A.find(".the-artist").html(d)
                        },
                        error: function(a) {
                            console.log("error loading icecast - ", a)
                        }
                    })
                }
                function u() {
                    if (!b)
                        return !1;
                    0 != b.hasClass("first-played") || b.attr("data-playfrom") && "0" != b.attr("data-playfrom") || (B = pb = 0,
                    c(m) && c(m).html() && -1 < c(m).html().indexOf("api.soundcloud.com") && 0 != m.currentTime && oa(0, {
                        call_from: "first_played_false"
                    }));
                    if ("fake" == y || a.fakeplayer)
                        0 == b.hasClass("current-feeder-for-parent-player") && ha && (H = ha),
                        0 == B && m && (B = m.duration,
                        H = m.currentTime),
                        gd = H,
                        Dc = B
                }
                function n() {
                    if (0 == dzsap_ytapiloaded) {
                        var a = document.createElement("script");
                        a.src = "https://www.youtube.com/iframe_api";
                        var b = document.getElementsByTagName("script")[0];
                        b.parentNode.insertBefore(a, b);
                        dzsap_ytapiloaded = !0
                    }
                }
                function r() {
                    L = a.skinwave_mode;
                    b.hasClass("skin-wave-mode-small") && (L = "small");
                    b.hasClass("skin-wave-mode-alternate") && (L = "alternate");
                    b.hasClass("skin-wave-mode-bigwavo") && (L = "bigwavo")
                }
                function l(a) {
                    var b = c(this)
                      , d = null;
                    b.parent().parent().hasClass("zoomsounds-comment-wrapper") && (d = b.parent().parent());
                    b.parent().parent().parent().hasClass("zoomsounds-comment-wrapper") && (d = b.parent().parent().parent());
                    if ("focusin" == a.type) {
                        var Oa = H / B * C.width();
                        Oa += "px";
                        qb = H / B * 100 + "%";
                        d.addClass("active");
                        fc(Oa)
                    }
                    if ("click" == a.type && (b.hasClass("comments-btn-cancel") && (d.removeClass("active"),
                    d.find("input").val("")),
                    b.hasClass("comments-btn-submit")))
                        return a = "",
                        d.find(".comment_email").length && (a = d.find(".comment_email").eq(0).val()),
                        gc(d.find(".comment_text").eq(0).val(), a),
                        d.removeClass("active"),
                        d.find("input").val(""),
                        !1
                }
                function Bb() {
                    var d = parseFloat(a.skinwave_wave_mode_canvas_reflection_size);
                    d = 1 - d;
                    var c = w.height();
                    "skin-wave" == a.design_skin && ("small" == L && (c = 60),
                    C && (0 == d ? C.css("top", w.offset().top - b.offset().top + c * d - C.height()) : (C.css("top", w.offset().top - w.parent().offset().top + c * d),
                    X.css("top", w.offset().top - w.parent().offset().top + c * d))),
                    I && I.css("top", c * d - I.outerHeight()),
                    N && N.css("top", c * d - N.outerHeight()));
                    b.attr("data-reflection-size", d)
                }
                function fb(a) {
                    if ("undefined" != typeof window.getSelection && "undefined" != typeof document.createRange) {
                        var b = document.createRange();
                        b.selectNodeContents(a);
                        a = window.getSelection();
                        a.removeAllRanges();
                        a.addRange(b)
                    } else
                        "undefined" != typeof document.selection && "undefined" != typeof document.body.createTextRange && (b = document.body.createTextRange(),
                        b.moveToElementText(a),
                        b.select())
                }
                function Cb(a, b) {
                    console.log("change_visual_target() - ", a);
                    var d = {};
                    b && (d = c.extend(d, b));
                    q && q.get(0) && q.get(0).api_pause_media_visual && q.get(0).api_pause_media_visual({
                        call_from: "change_visual_target"
                    });
                    q = a;
                    console.log("new _feed_fakePlayer -  ", q);
                    var g = q.get(0);
                    ta && q && g && g.api_play_media_visual && g.api_play_media_visual();
                    g && g.api_draw_curr_time && (g.api_set_time_curr(H),
                    g.api_get_times({
                        call_from: " change visual target .. in api "
                    }),
                    g.api_check_time({
                        fire_only_once: !0
                    }),
                    g.api_draw_curr_time(),
                    g.api_draw_scrub_prog());
                    setTimeout(function() {
                        g && g.api_draw_curr_time && (g.api_get_times(),
                        g.api_check_time({
                            fire_only_once: !0
                        }),
                        g.api_draw_curr_time(),
                        g.api_draw_scrub_prog())
                    }, 800)
                }
                function Db(d) {
                    a.design_wave_color_progress = d;
                    "canvas" == a.skinwave_wave_mode && (Ha(Za.get(0), b.attr("data-pcm"), "#" + a.design_wave_color_bg, {
                        call_from: "canvas_change_pcm_bg"
                    }),
                    Ha($a.get(0), b.attr("data-pcm"), "#" + a.design_wave_color_progress, {
                        call_from: "canvas_change_pcm_prog"
                    }))
                }
                function hc(d, g) {
                    var h = {
                        type: "",
                        fakeplayer_is_feeder: "off",
                        call_from: "default",
                        source: "default",
                        pcm: "",
                        artist: "",
                        song_name: "",
                        thumb: "",
                        thumb_link: "",
                        autoplay: "on",
                        cue: "on",
                        feeder_type: "player",
                        watermark: "",
                        watermark_volume: "",
                        playerid: ""
                    };
                    ia = "on";
                    var e = 500;
                    g && (h = c.extend(h, g));
                    Kd++;
                    c(".current-feeder-for-parent-player").removeClass("current-feeder-for-parent-player");
                    e = !0;
                    d && d.attr && b.attr("data-source") == d.attr("data-source") && (e = !1);
                    b.attr("data-source") == d && (e = !1);
                    e && q && q.get(0).api_pause_media_visual({
                        call_from: "change_media"
                    });
                    "on" == h.fakeplayer_is_feeder ? (q = d,
                    b.data("feeding-from", q.get(0)),
                    q.addClass("current-feeder-for-parent-player"),
                    h.source = q.attr("data-source"),
                    q.attr("data-pcm") && (h.pcm = q.attr("data-pcm")),
                    q.attr("data-thumb") && (h.thumb = d.attr("data-thumb")),
                    q.attr("data-thumb_link") && (h.thumb_link = d.attr("data-thumb_link")),
                    q.attr("data-soft-watermark") && (h.watermark = d.attr("data-soft-watermark")),
                    q.attr("data-watermark-volume") && (h.watermark_volume = d.attr("data-watermark-volume")),
                    q.attr("data-sample_time_start") ? b.attr("data-sample_time_start", d.attr("data-sample_time_start")) : b.attr("data-sample_time_start", ""),
                    q.attr("data-sample_time_end") ? b.attr("data-sample_time_end", d.attr("data-sample_time_end")) : b.attr("data-sample_time_end", ""),
                    q.attr("data-pseudo-sample_time_start") ? b.attr("data-pseudo-sample_time_start", q.attr("data-pseudo-sample_time_start")) : b.attr("data-pseudo-sample_time_start", ""),
                    q.attr("data-pseudo-sample_time_end") ? b.attr("data-pseudo-sample_time_end", q.attr("data-pseudo-sample_time_end")) : b.attr("data-pseudo-sample_time_end", ""),
                    q.attr("data-sample_time_total") ? b.attr("data-sample_time_total", d.attr("data-sample_time_total")) : b.attr("data-sample_time_total", ""),
                    ya = null) : (q = null,
                    ya = d);
                    if (d) {
                        d.attr("data-playerid") ? (b.attr("data-feed-playerid", d.attr("data-playerid")),
                        h.playerid = d.attr("data-playerid")) : (b.attr("data-feed-playerid", ""),
                        h.playerid = "");
                        if (0 < d.find(".meta-artist").length || 0 < d.find(".meta-artist-con").length)
                            h.artist = d.find(".the-artist").eq(0).html(),
                            h.song_name = d.find(".the-name").eq(0).html();
                        d.attr("data-thumb_for_parent") && (h.thumb = d.attr("data-thumb_for_parent"));
                        if (0 < d.find(".feed-song-name").length || 0 < d.find(".feed-artist-name").length)
                            h.artist = d.find(".feed-artist-name").eq(0).html(),
                            h.song_name = d.find(".feed-song-name").eq(0).html()
                    }
                    if (q) {
                        if (b.attr("data-source") == d.attr("data-source"))
                            return !1
                    } else if (b.attr("data-source") == d)
                        return !1;
                    ya && (e = ya,
                    h.source = e.attr("data-source"),
                    e.attr("data-pcm") && (h.pcm = e.attr("data-pcm")),
                    0 < e.find(".meta-artist").length && (h.artist = d.find(".the-artist").eq(0).html(),
                    h.song_name = d.find(".the-name").eq(0).html()),
                    e.attr("data-thumb") && (h.thumb = d.attr("data-thumb")),
                    e.attr("data-thumb_link") && (h.thumb_link = d.attr("data-thumb_link")),
                    d.attr("data-type") && (h.type = d.attr("data-type")));
                    "detect" == h.type && (h.type = "audio");
                    b.removeClass("meta-loaded");
                    b.parent().hasClass("audioplayer-was-loaded") && (b.parent().addClass("audioplayer-loaded"),
                    b.parent().removeClass("audioplayer-was-loaded"));
                    ja && ja.addClass("audioplayer-loaded");
                    b.removeClass("errored-out");
                    gb();
                    b.attr("data-source", h.source);
                    b.attr("data-soft-watermark", h.watermark);
                    a.watermark_volume = h.watermark_volume ? h.watermark_volume : 1;
                    g = h.type;
                    "mediafile" == h.type && (h.type = "audio");
                    h.type && ("soundcloud" == h.type && (h.type = "audio"),
                    "album_part" == h.type && (h.type = "audio"),
                    b.attr("data-type", h.type),
                    y = h.type,
                    a.type = h.type);
                    ab = !1;
                    "skin-wave" == a.design_skin && ("canvas" == a.skinwave_wave_mode && (bb = q ? d.attr("data-source") : d,
                    d && h.pcm ? (b.attr("data-pcm", d.attr("data-pcm")),
                    ka(d.attr("data-pcm"))) : ua({
                        call_from: "regenerate_canvas_from_change_media"
                    }),
                    "" != h.pcm ? (ka(h.pcm),
                    b.attr("data-pcm", h.pcm)) : (w.addClass("fast-animate-scrubbar"),
                    b.removeClass("scrubbar-loaded"),
                    setTimeout(function() {}, 10),
                    setTimeout(function() {
                        b.removeClass("fast-animate-scrubbar");
                        cb = !1;
                        b.attr("data-pcm", "");
                        Eb();
                        ua({
                            call_from: "regenerate_canvas_from_change_media"
                        })
                    }, 120))),
                    h.thumb && (b.find(".the-thumb").length ? b.find(".the-thumb").css("background-image", "url(" + h.thumb + ")") : (b.attr("data-thumb", h.thumb),
                    z())));
                    h.thumb ? (b.find(".the-thumb").length ? b.find(".the-thumb").css("background-image", "url(" + h.thumb + ")") : (b.attr("data-thumb", h.thumb),
                    z()),
                    b.removeClass("does-not-have-thumb"),
                    b.addClass("has-thumb")) : (b.addClass("does-not-have-thumb"),
                    b.removeClass("has-thumb"));
                    "" == h.pcm && Q();
                    q && (q.attr("data-playerid") ? za = q.attr("data-playerid") : q.attr("data-source") && (za = q.attr("data-source")));
                    ea && (e = ea.children(".dzstooltip--inner"),
                    e.children().removeClass("current-playlist-item"),
                    e.children().each(function() {
                        var a = c(this);
                        a.attr("data-playerid") == h.playerid && (a.addClass("current-playlist-item"),
                        ic = 0)
                    }));
                    e = 100;
                    q && d.find(".meta-artist").eq(0).html();
                    if (q) {
                        var f = null;
                        q.find(".feed-dzsap-for-extra-html-right").length ? f = q.find(".feed-dzsap-for-extra-html-right").eq(0) : q.attr("data-playerid") && c(document).find('.feed-dzsap-for-extra-html-right[data-playerid="' + q.attr("data-playerid") + '"]').length && (f = c(document).find('.feed-dzsap-for-extra-html-right[data-playerid="' + q.attr("data-playerid") + '"]').eq(0));
                        f && b.find(".extrahtml-in-float-right").eq(0).html(f.html())
                    }
                    h.artist && b.find(".the-artist").html(h.artist);
                    h.song_name && b.find(".the-name").html(h.song_name);
                    "soundcloud" == g && -1 == h.source.indexOf("api.soundcloud") ? (xa = h.source,
                    console.log("RETRIEVE SOUNDCLOUD URL"),
                    rb = !0,
                    setTimeout(function() {
                        rb = !0
                    }, 501),
                    Fb()) : Da({
                        call_from: "change_media"
                    });
                    W();
                    Gb && db(Gb, {
                        call_from: "change_media"
                    });
                    if ("fake" == y)
                        return !1;
                    a.action_audio_change_media && a.action_audio_change_media(d, h);
                    "on" == h.autoplay && 0 == dzsap_is_mobile() && (Ec(),
                    setTimeout(function() {
                        Y({
                            call_from: "margs.autoplay"
                        })
                    }, 500));
                    setTimeout(function() {
                        Pa()
                    }, e)
                }
                function jc() {
                    if (Hb)
                        return !1;
                    Ib = !0
                }
                function kc() {
                    if (Hb)
                        return !1;
                    ta && Qa();
                    c(window).off("resize.dzsap");
                    b.remove();
                    b = null;
                    Hb = !0
                }
                function hb(a, g) {
                    a = {
                        do_not_autoplay: !1
                    };
                    g && (a = c.extend(a, g));
                    b.find(".playbtn").unbind("click", hb);
                    b.find(".scrubbar").unbind("click", hb);
                    Da(a);
                    (is_android() || is_ios()) && Y({
                        call_from: "click_for_setup_media"
                    })
                }
                function Fc(b) {
                    a.parentgallery && "undefined" != typeof a.parentgallery.get(0) && a.parentgallery.get(0).api_toggle_menu_state()
                }
                function Gc(d) {
                    var g = c(this)
                      , h = parseInt(d.clientX, 10) - g.offset().left;
                    qb = h / g.width() * 100 + "%";
                    htmlEncode("");
                    if (!a.skinwave_comments_links_to) {
                        if ("off" == a.skinwave_comments_allow_post_if_not_logged_in && "none" == a.skinwave_comments_account)
                            return !1;
                        var e = !0;
                        C.children().each(function() {
                            var a = c(this);
                            if (!a.hasClass("placeholder") && !a.hasClass("the-bg") && (a = a.offset().left - g.offset().left,
                            20 > Math.abs(a - h)))
                                return C.find(".dzstooltip-con.placeholder").remove(),
                                e = !1
                        });
                        if (!e)
                            return !1;
                        d = C.offset().left - b.offset().left;
                        var f = h + d - X.width() / 2 + 7
                          , k = -1;
                        f < d ? (k = f + 32,
                        f = d,
                        b.append('<style class="comments-writter-temp-css">.audioplayer.skin-wave .comments-writer .comments-writer-inner:before{ left:' + k + "px  }</style>")) : f > pa - d - X.width() / 2 ? (k = h - (X.offset().left - b.offset().left) + X.width() / 3,
                        f = pa - d - X.width() / 2,
                        b.append('<style class="comments-writter-temp-css">.audioplayer.skin-wave .comments-writer .comments-writer-inner:before{ left:' + k + "px  }</style>")) : b.find(".comments-writter-temp-css").remove();
                        X.css("left", f + "px");
                        X.css({
                            left: "50%",
                            top: "80px",
                            transform: "translate3d(-50%,0,0)",
                            width: "100%"
                        });
                        X.css("top", parseInt(C.css("top"), 10) + 20 + "px");
                        0 == X.hasClass("active") && (X.css({
                            height: X.find(".comments-writer-inner").eq(0).outerHeight() + 20
                        }),
                        X.addClass("active"),
                        b.addClass("comments-writer-active"),
                        a.parentgallery && void 0 != c(a.parentgallery).get(0) && void 0 != c(a.parentgallery).get(0).api_handleResize && c(a.parentgallery).get(0).api_handleResize());
                        "none" != a.skinwave_comments_account && b.find("input[name=comment-email]").remove();
                        fc(qb)
                    }
                }
                function fc(b) {
                    C.remove(".dzsap-style-comments");
                    C.append('<style class="dzsap-style-comments">.dzstooltip-con:not(.placeholder) { opacity: 0.5; }</style>');
                    C.find(".dzstooltip-con.placeholder").remove();
                    C.append('<span class="dzstooltip-con placeholder" style="left:' + b + ';"><div class="the-avatar" style="background-image: url(' + a.skinwave_comments_avatar + ')"></div></span>')
                }
                function lc(a) {
                    Jb()
                }
                function gc(d, g, h) {
                    if (g) {
                        if (0 == /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(g))
                            return alert("please insert email, your email is just used for gravatar. it will not be sent or stored anywhere"),
                            !1;
                        h = String(g).split("@")[0];
                        a.skinwave_comments_account = h;
                        Ra && Ra.find("*[name=comment_email],*[name=comment_user]").remove();
                        a.skinwave_comments_avatar = "https://secure.gravatar.com/avatar/" + MD5(String(b.find("input[name=comment-email]").eq(0).val()).toLowerCase()) + "?s=20"
                    }
                    console.log("comment_submit() - ", d, g);
                    h = a.skinwave_comments_account;
                    g = "";
                    "on" != a.skinwave_comments_process_in_php ? (g += '<span class="dzstooltip-con zoomsounds-comment" style="left:' + qb + '"><div class="the-avatar tooltip-indicator" style="background-image: url(' + a.skinwave_comments_avatar + ')"></div><span class="dzstooltip arrow-bottom style-rounded color-dark-light talign-start  transition-slidein arrow-bottom " style="width: 250px;"><span class="dzstooltip--inner"><span class="the-comment-author">@' + h + "</span> says:<br>",
                    g += htmlEncode(d),
                    g += "</span></span></span>") : g += d;
                    b.find("*[name=comment-text]").eq(0).val("");
                    b.find(".comments-writter-temp-css,.dzsap-style-comments").remove();
                    Kb(g);
                    Jb();
                    a.parentgallery && void 0 != c(a.parentgallery).get(0) && void 0 != c(a.parentgallery).get(0).api_player_commentSubmitted && c(a.parentgallery).get(0).api_player_commentSubmitted()
                }
                function Lb(a) {
                    a = "";
                    b.find("input[name=comment-email]").length && (a = b.find("input[name=comment-email]").eq(0).val());
                    gc(b.find("*[name=comment-text]").eq(0).val(), a);
                    return !1
                }
                function Jb() {
                    b.removeClass("comments-writer-active");
                    C.find(".dzstooltip-con.placeholder").remove();
                    X.removeClass("active");
                    X.css({
                        height: 0
                    });
                    a.parentgallery && void 0 != c(a.parentgallery).get(0) && void 0 != c(a.parentgallery).get(0).api_handleResize && c(a.parentgallery).get(0).api_handleResize();
                    setTimeout(function() {
                        b.find(".comments-writter-temp-css,.dzsap-style-comments").remove()
                    }, 300)
                }
                function Sa(a) {
                    console.log("check_yt_ready()", ab, window.YT);
                    if (1 != ab)
                        return a || (a = Mb),
                        console.log(a, c(a)),
                        m = new YT.Player(a + "",{
                            height: "200",
                            width: "200",
                            videoId: b.attr("data-source"),
                            playerVars: {
                                origin: "",
                                controls: 1,
                                showinfo: 0,
                                playsinline: 1,
                                rel: 0,
                                autohide: 0,
                                wmode: "transparent",
                                iv_load_policy: "3"
                            },
                            events: {
                                onReady: Nb,
                                onStateChange: Hc
                            }
                        }),
                        Ic = !0,
                        !1
                }
                function Nb(a) {
                    console.log("check_yt_ready_phase_two", a);
                    m && m.getPlayerState ? (Ea({
                        call_from: "check_yt_ready_phase_two"
                    }),
                    Jc && setTimeout(function() {
                        Y({
                            call_from: "check_yt_ready_phase_two"
                        })
                    }, 500)) : setTimeout(function() {
                        Nb(a)
                    }, 1E3)
                }
                function Hc(a) {
                    2 == a.data && Qa({
                        call_from: "youtube paused"
                    });
                    1 == a.data && (Y({
                        call_from: "youtube playing"
                    }),
                    b.addClass("dzsap-loaded"));
                    -1 == a.data && ta && oa(0)
                }
                function sb() {
                    setTimeout(function() {
                        b && b.addClass("scrubbar-loaded")
                    }, 1E3)
                }
                function Eb(d) {
                    var g = {};
                    d && (g = c.extend(g, d));
                    if ("fake" == bb)
                        return !1;
                    b.attr("data-pcm") || (d = {
                        action: "dzsap_get_pcm",
                        postdata: "1",
                        source: b.attr("data-source"),
                        playerid: za
                    },
                    a.settings_php_handler && (c.ajax({
                        type: "POST",
                        url: a.settings_php_handler,
                        data: d,
                        success: function(d) {
                            if (d)
                                "0" != d && -1 < d.indexOf(",") ? (b.attr("data-pcm", d),
                                cb = !0,
                                w.css("opacity"),
                                setTimeout(function() {
                                    b.addClass("scrubbar-loaded");
                                    Bb();
                                    setTimeout(function() {}, 100)
                                }, 100)) : (Ob = !0,
                                ua({
                                    call_from: "no response from pcm ajax, generate it"
                                }));
                            else if ("on" == a.cue)
                                Ob = !0,
                                ua({
                                    call_from: "pcm_data_try_to_generate .. no data-pcm"
                                });
                            else if (hd = !0,
                            "on" == a.pcm_data_try_to_generate_wait_for_real_pcm) {
                                d = [];
                                for (var c = 0; 200 > c; c++)
                                    d[c] = Number(Math.random()).toFixed(3);
                                d = JSON.stringify(d);
                                ka(d);
                                cb = !1
                            }
                        },
                        error: function(a) {}
                    }),
                    Ob = !1))
                }
                function ua(d) {
                    var g = {
                        call_from: "default",
                        call_attempt: 0
                    };
                    d && (g = c.extend(g, d));
                    if (cb || "fake" == bb)
                        return !1;
                    if (!Ob)
                        return setTimeout(function() {
                            g.call_attempt++;
                            10 > g.call_attempt && ua(g)
                        }, 1E3),
                        !1;
                    if (window.WaveSurfer)
                        t({
                            call_from: "wavesurfer already loaded"
                        });
                    else {
                        var h = document.getElementsByTagName("script");
                        d = "";
                        for (var e in h)
                            if (h[e] && h[e].src && -1 < h[e].src.indexOf("audioplayer.js"))
                                break;
                        e = String(h[e].src).split("/");
                        for (h = 0; h < e.length - 1; h++)
                            d += e[h] + "/";
                        var f = d + "wavesurfer.js";
                        "on" == a.pcm_notice && (b.addClass("errored-out"),
                        b.append('<div class="feedback-text pcm-notice">please wait while pcm data is generated.. </div>'));
                        dzsap_wavesurfer_load_attempt++;
                        2 < dzsap_wavesurfer_load_attempt && (f = "https://unpkg.com/wavesurfer.js@2.1.3/dist/wavesurfer.min.js");
                        6 > dzsap_wavesurfer_load_attempt && c.ajax({
                            url: f,
                            dataType: "script",
                            success: function(a) {
                                t({
                                    call_from: "load_script",
                                    wavesurfer_url: f
                                })
                            },
                            error: function(a) {}
                        })
                    }
                }
                function Pb(d) {
                    try {
                        d = JSON.stringify(JSON.parse(String(d)).map(Math.abs))
                    } catch (g) {
                        console.log(g)
                    }
                    b.attr("data-pcm", d);
                    ya && ya.attr && ya.attr("data-pcm", d);
                    q && q.attr && q.attr("data-pcm", d);
                    b.find(".pcm-notice").fadeOut("fast");
                    b.removeClass("errored-out");
                    "" == za && (za = b.attr("data-source"),
                    Kc && (za = Kc));
                    d = {
                        action: "dzsap_submit_pcm",
                        postdata: d,
                        playerid: za,
                        source: b.attr("data-source")
                    };
                    window.dzsap_generating_pcm = !1;
                    a.settings_php_handler && c.ajax({
                        type: "POST",
                        url: a.settings_php_handler,
                        data: d,
                        success: function(a) {}
                    })
                }
                function t(d) {
                    var g = {
                        call_from: "default"
                    };
                    d && c.extend(g, d);
                    if ("fake" == bb)
                        return !1;
                    if (window.dzsap_generating_pcm)
                        return setTimeout(function() {
                            t(g)
                        }, 1E3),
                        !1;
                    window.dzsap_generating_pcm = !0;
                    d = "wavesurfer" + Math.ceil(1E4 * Math.random());
                    b.append('<div id="' + d + '" class="hidden"></div>');
                    var h = WaveSurfer.create({
                        container: "#" + d,
                        normalize: !0,
                        pixelRatio: 1
                    });
                    if (0 != String(b.attr("data-source")).indexOf("https://soundcloud.com") && "fake" != b.attr("data-source")) {
                        String(b.attr("data-source")).indexOf("https://api.soundcloud.com");
                        try {
                            h.load(bb)
                        } catch (Oa) {
                            console.log("WAVE SURFER NO LOAD")
                        }
                        h.on("ready", function() {
                            var b = 100;
                            m && m.duration && 1E3 < m.duration && (b = 100);
                            b = h && h.exportPCM ? h.exportPCM(a.wavesurfer_pcm_length, b, !0) : Lc();
                            Pb(b);
                            ka(b)
                        });
                        h.on("error", function() {
                            console.log("WAVE SURFER ERROR !!!");
                            for (var a = [], b = 0; 200 > b; b++)
                                a[b] = Math.abs(Number(Math.random()).toFixed(3));
                            a = JSON.stringify(a);
                            Pb(a);
                            ka(a)
                        })
                    }
                }
                function ka(d) {
                    w.find(".scrub-bg-img,.scrub-prog-img").removeClass("transitioning-in");
                    w.find(".scrub-bg-img,.scrub-prog-img").addClass("transitioning-out");
                    w.find(".scrub-bg-img,.scrub-prog-img").animate({
                        opacity: 0
                    }, {
                        queue: !1,
                        duration: 300
                    });
                    R({
                        prepare_for_transition_in: !0
                    });
                    Za = b.find(".scrub-bg-img.transitioning-in");
                    $a = b.find(".scrub-prog-img.transitioning-in");
                    Ha(Za.get(0), d, "#" + a.design_wave_color_bg, {
                        call_from: "canvas_generate_wave_data_animate_pcm_bg"
                    });
                    Ha($a.get(0), d, "#" + a.design_wave_color_progress, {
                        call_from: "canvas_generate_wave_data_animate_pcm_prog"
                    });
                    w.find(".scrub-bg-img.transitioning-in,.scrub-prog-img.transitioning-in").animate({
                        opacity: 1
                    }, {
                        queue: !1,
                        duration: 300,
                        complete: function() {
                            var a = c(this).parent();
                            a.children(".transitioning-out").remove();
                            a.children(".transitioning-in").removeClass("transitioning-in")
                        }
                    });
                    cb = !0;
                    sb()
                }
                function z() {
                    if (b.attr("data-thumb")) {
                        b.addClass("has-thumb");
                        var d = "";
                        d = b.attr("data-thumb_link") ? d + ('<a href="' + b.attr("data-thumb_link") + '"') : d + "<div";
                        d += ' class="the-thumb-con"><div class="the-thumb" style=" background-image:url(' + b.attr("data-thumb") + ')"></div>';
                        d = b.attr("data-thumb_link") ? d + "</a>" : d + "</div>";
                        b.children(".the-thumb-con").length && (d = b.children(".the-thumb-con").eq(0));
                        "skin-customcontrols" != a.design_skin && ("skin-wave" != a.design_skin || "small" != L && "alternate" != L ? "skin-steel" == a.design_skin ? Aa.prepend(d) : O.prepend(d) : "alternate" == L ? O.prepend(d) : Aa.prepend(d));
                        id = O.children(".the-thumb-con").eq(0)
                    } else
                        b.removeClass("has-thumb")
                }
                function tb() {
                    b.removeClass("skin-wave-mode-normal");
                    "skin-wave" == a.design_skin && (b.addClass("skin-wave-mode-" + L),
                    b.addClass("skin-wave-wave-mode-" + a.skinwave_wave_mode),
                    "on" == a.skinwave_enableSpectrum && b.addClass("skin-wave-is-spectrum"),
                    b.addClass("skin-wave-wave-mode-canvas-mode-" + a.skinwave_wave_mode_canvas_mode))
                }
                function Fb(d) {
                    console.log(" ooo - ", a);
                    "" == a.soundcloud_apikey && alert("soundcloud api key not defined, read docs!");
                    d = "http://api.soundcloud.com/resolve?url=" + xa + "&format=json&consumer_key=" + a.soundcloud_apikey;
                    "skin-wave" != a.design_skin || b.attr("data-scrubbg") || (a.skinwave_enableReflect = "off");
                    d = encodeURIComponent(d);
                    var g = a.php_retriever + "?scurl=" + d;
                    c.ajax({
                        type: "GET",
                        url: g,
                        data: {},
                        async: !0,
                        dataType: "text",
                        error: function(a, b, d) {
                            console.log("retried soundcloud error", a, b, d)
                        },
                        success: function(d) {
                            var c = [];
                            try {
                                if (c = JSON.parse(d),
                                y = "audio",
                                "" == c && (b.addClass("errored-out"),
                                b.append('<div class="feedback-text">soundcloud track does not seem to serve via api</div>')),
                                Kc = b.attr("data-source"),
                                c.stream_url ? (b.attr("data-source", c.stream_url + "?consumer_key=" + a.soundcloud_apikey + "&origin=localhost"),
                                ya && ya.attr("data-source", b.attr("data-source")),
                                q && q.attr("data-source", b.attr("data-source"))) : (b.addClass("errored-out"),
                                b.append('<div class="feedback-text ">this soundcloud track does not allow streaming  </div>')),
                                bb = b.attr("data-source"),
                                b.attr("data-pcm") && (cb = !0),
                                "skin-wave" == a.design_skin && "canvas" == a.skinwave_wave_mode && 0 == cb && 0 == ("on" == a.pcm_data_try_to_generate && "on" == a.pcm_data_try_to_generate_wait_for_real_pcm) && ua({
                                    call_from: "init(), pcm not real.."
                                }),
                                "on" == a.cue || q || ya)
                                    Da({
                                        call_from: "retrieve_soundcloud_url"
                                    }),
                                    setTimeout(function() {
                                        rb && (Y({
                                            call_from: "retrieve_soundcloud_url"
                                        }),
                                        rb = !1)
                                    }, 300)
                            } catch (Td) {
                                console.log("soduncloud parse error -", d, " - ", g)
                            }
                        }
                    })
                }
                function ba(a, b) {
                    var d = {
                        call_from: "default"
                    };
                    b && c.extend(d, b);
                    ea && (b = ea.find(".dzstooltip--inner"),
                    b = b.children().eq(a),
                    d = b.attr("data-playerid"),
                    b = c('.audioplayer[data-playerid="' + d + '"],.audioplayer-tobe[data-playerid="' + d + '"]'),
                    d && b.length && b.eq(0).get(0) && b.eq(0).get(0).api_play_media ? c('.audioplayer[data-playerid="' + d + '"]').eq(0).get(0).api_play_media({
                        call_from: "api_sync_players_prev"
                    }) : b.parent().parent().parent().hasClass("audiogallery") ? b.parent().parent().parent().get(0).api_goto_item(a) : hc(b),
                    ic = a)
                }
                function Ia(a) {
                    var d = {
                        call_from: "default"
                    };
                    a && (d = c.extend(d, a));
                    console.log("dzsap_list_for_sync_players - dzsap_list_for_sync_players len - ", dzsap_list_for_sync_players.length, ea);
                    if (ea) {
                        dzsap_list_for_sync_players.length ? ea.parent().removeClass("is-empty") : ea.parent().addClass("is-empty");
                        ea.find(".dzstooltip--inner").html("");
                        var h = "", e;
                        for (e in dzsap_list_for_sync_players)
                            a = dzsap_list_for_sync_players[e],
                            a.hasClass("number-wrapper") || a.hasClass("for-number-wrapper") || (h += '<div class="playlist-menu-item"',
                            c.each(a.get(0).attributes, function() {
                                this.specified && this.name && "id" != this.name && "style" != this.name && (h += " " + this.name + '="' + this.value + '"')
                            }),
                            h += ">",
                            h += '<div class="pi-thumb-con">',
                            h += '<div class="pi-thumb divimage" style="background-image: url(' + a.attr("data-thumb") + ')">',
                            h += "</div>",
                            h += "</div>",
                            h += '<div class="pi-meta-con">',
                            h += '<div class="pi-the-artist">',
                            h += a.find(".the-artist").eq(0).text(),
                            h += "</div>",
                            h += '<div class="pi-the-name">',
                            h += a.find(".the-name").eq(0).text(),
                            h += "</div>",
                            h += "</div>",
                            h += '<div class="the-sort-handle">',
                            h += '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="12px" height="12px" viewBox="0 0 511.626 511.627" style="enable-background:new 0 0 511.626 511.627;" xml:space="preserve"> <g><path d="M328.906,401.994h-36.553V109.636h36.553c4.948,0,9.236-1.809,12.847-5.426c3.613-3.615,5.421-7.898,5.421-12.845 c0-4.949-1.801-9.231-5.428-12.851l-73.087-73.09C265.044,1.809,260.76,0,255.813,0c-4.948,0-9.229,1.809-12.847,5.424 l-73.088,73.09c-3.618,3.619-5.424,7.902-5.424,12.851c0,4.946,1.807,9.229,5.424,12.845c3.619,3.617,7.901,5.426,12.85,5.426 h36.545v292.358h-36.542c-4.952,0-9.235,1.808-12.85,5.421c-3.617,3.621-5.424,7.905-5.424,12.854 c0,4.945,1.807,9.227,5.424,12.847l73.089,73.088c3.617,3.617,7.898,5.424,12.847,5.424c4.95,0,9.234-1.807,12.849-5.424 l73.087-73.088c3.613-3.62,5.421-7.901,5.421-12.847c0-4.948-1.808-9.232-5.421-12.854 C338.142,403.802,333.857,401.994,328.906,401.994z" fill="#363636"/> </g></svg>',
                            h += "</div>",
                            h += "</div>");
                        ea.find(".dzstooltip--inner").append(h);
                        b.on("mousedown", ".the-sort-handle", ub);
                        c(document).on("mousemove.dzsap_playlist_item", function(a) {
                            if (window.dzsap_moving_playlist_item) {
                                var b = a.clientY;
                                b -= dzsap_playlist_con.offset().top;
                                dzsap_playlist_item_moving.css("top", b - 20);
                                dzsap_playlist_item_target.parent().children(':not(".target-playlist-item"):not(".cloner")').each(function() {
                                    var a = c(this)
                                      , d = a.offset().top - dzsap_playlist_con.offset().top;
                                    b > d && a.after(dzsap_playlist_item_target)
                                });
                                50 > b && dzsap_playlist_item_target.parent().prepend(dzsap_playlist_item_target)
                            }
                        });
                        c(document).on("mouseup.dzsap_playlist_item", function(a) {
                            window.dzsap_moving_playlist_item && (window.dzsap_moving_playlist_item = !1,
                            dzsap_playlist_item_moving.parent().children(".cloner").remove(),
                            dzsap_playlist_item_target.removeClass("target-playlist-item"),
                            dzsap_playlist_item_moving.remove(),
                            dzsap_playlist_item_target = dzsap_playlist_item_moving = null)
                        })
                    } else
                        console.error("no tooltip .. why, should be here?")
                }
                function S(d) {
                    var g = {
                        setup_inner_player: !0,
                        setup_media: !0,
                        setup_otherstructure: !0,
                        call_from: "default"
                    };
                    d && (g = c.extend(g, d));
                    "reconstruct" == g.call_from && (A = null,
                    b.hasClass("skin-wave") && (a.design_skin = "skin-wave"),
                    b.hasClass("skin-silver") && (a.design_skin = "skin-silver"));
                    g.setup_inner_player && (b.append('<div class="audioplayer-inner"></div>'),
                    O = b.children(".audioplayer-inner"));
                    g.setup_media && (O.append('<div class="the-media"></div>'),
                    T = O.children(".the-media").eq(0));
                    if (0 == g.setup_otherstructure)
                        return !1;
                    "skin-customcontrols" != a.design_skin && O.append('<div class="ap-controls"></div>');
                    ca = O.children(".ap-controls").eq(0);
                    b.attr("data-wrapper-image") && (d = new Image,
                    0 == b.hasClass("zoomsounds-no-wrapper") && (d.onload = function() {
                        b.css("background-image", "url(" + this.src + ")");
                        setTimeout(function() {
                            b.find(".zoomsounds-bg").addClass("loaded");
                            300 < pa && (pa = 300);
                            b.hasClass("zoomsounds-wrapper-bg-bellow") && b.css("padding-top", 200)
                        }, 100)
                    }
                    ,
                    d.src = b.attr("data-wrapper-image")));
                    var h = ""
                      , e = "";
                    d = '<div class="scrubbar"><div class="scrub-bg"></div><div class="scrub-buffer"></div><div class="scrub-prog"></div><div class="scrubBox"></div><div class="scrubBox-prog"></div><div class="scrubBox-hover"></div>';
                    e = '<div class="total-time">00:00</div><div class="curr-time">00:00</div>';
                    Cc && (d += '<div class="sample-block-start" style="width: ' + 100 * Cc + '%"></div>');
                    dc && (d += '<div class="sample-block-end" style="left: ' + 100 * dc + "%; width: " + (100 - 100 * dc) + '%"></div>');
                    d += "</div>";
                    a.controls_external_scrubbar && (d = "");
                    var f = "";
                    a.settings_extrahtml_before_play_pause && (f += a.settings_extrahtml_before_play_pause);
                    f += '<div class="con-playpause-con">';
                    b.find(".feed-dzsap-before-playpause").length && (f += b.find(".feed-dzsap-before-playpause").eq(0).html(),
                    b.find(".feed-dzsap-before-playpause").remove());
                    f += '<div class="con-playpause';
                    "on" == Ja.show_tooltips && (f += " dzstooltip-con");
                    f += '">';
                    "on" == Ja.show_tooltips && (f += dzsap_generate_keyboard_tooltip(Ja, "pause_play"));
                    f += '<div class="playbtn player-but"><div class="the-icon-bg"></div><div class="dzsap-play-icon">';
                    var k = !1;
                    if (b.hasClass("skin-wave") || b.hasClass("skin-pro") || b.hasClass("skin-silver") || b.hasClass("skin-redlights") || b.hasClass("skin-default"))
                        k = !0;
                    k && (f += '<svg class="svg-icon" version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11.161px" height="12.817px" viewBox="0 0 11.161 12.817" enable-background="new 0 0 11.161 12.817" xml:space="preserve"> <g> <g> <g> <path fill="#D2D6DB" d="M8.233,4.589c1.401,0.871,2.662,1.77,2.801,1.998c0.139,0.228-1.456,1.371-2.896,2.177l-4.408,2.465 c-1.44,0.805-2.835,1.474-3.101,1.484c-0.266,0.012-0.483-1.938-0.483-3.588V3.666c0-1.65,0.095-3.19,0.212-3.422 c0.116-0.232,1.875,0.613,3.276,1.484L8.233,4.589z"/> </g> </g> </g> </svg>  ');
                    f += '</div></div><div class="pausebtn player-but"><div class="the-icon-bg"></div><div class="pause-icon">';
                    k && (f += ' <svg class="svg-icon" version="1.1" id="Layer_3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="12px" height="13px" viewBox="0 0 13.415 16.333" enable-background="new 0 0 13.415 16.333" xml:space="preserve"> <path fill="#D2D6DB" d="M4.868,14.59c0,0.549-0.591,0.997-1.322,0.997H2.2c-0.731,0-1.322-0.448-1.322-0.997V1.618 c0-0.55,0.592-0.997,1.322-0.997h1.346c0.731,0,1.322,0.447,1.322,0.997V14.59z"/> <path fill="#D2D6DB" d="M12.118,14.59c0,0.549-0.593,0.997-1.324,0.997H9.448c-0.729,0-1.322-0.448-1.322-0.997V1.619 c0-0.55,0.593-0.997,1.322-0.997h1.346c0.731,0,1.324,0.447,1.324,0.997V14.59z"/> </svg>  ');
                    f += "</div></div>";
                    "skin-wave" == a.design_skin && (f += a.skinwave_preloader_code);
                    f += "</div>";
                    b.find(".feed-dzsap-after-playpause").length && (f += b.find(".feed-dzsap-after-playpause").eq(0).html(),
                    b.find(".feed-dzsap-after-playpause").remove());
                    f += "</div>";
                    h += '<div class="con-controls"><div class="the-bg"></div>' + f;
                    a.settings_extrahtml_in_float_left && (h += a.settings_extrahtml_in_float_left);
                    "skin-pro" == a.design_skin && (h += '<div class="con-controls--right"></div>');
                    k = '<div class="controls-volume"><div class="volumeicon"></div><div class="volume_static"></div><div class="volume_active"></div><div class="volume_cut"></div></div>';
                    "on" == a.disable_volume && (k = "");
                    if ("skin-default" == a.design_skin || "skin-wave" == a.design_skin)
                        h += '<div class="ap-controls-right">',
                        "on" != a.disable_volume && (h += '<div class="controls-volume"><div class="volumeicon"></div><div class="volume_static"></div><div class="volume_active"></div><div class="volume_cut"></div></div>'),
                        h += "</div>";
                    h += "</div>";
                    if ("skin-wave" == a.design_skin && "small" == L)
                        h = '<div class="the-bg"></div><div class="ap-controls-left">' + f + "</div>" + d + '<div class="ap-controls-right">' + k + '<div class="extrahtml-in-float-right for-skin-wave-small">' + va + "</div></div>";
                    else if ("skin-aria" == a.design_skin || "skin-silver" == a.design_skin || "skin-redlights" == a.design_skin || "skin-steel" == a.design_skin)
                        "skin-silver" == a.design_skin && (p = '<svg version="1.2" baseProfile="tiny" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15px" height="30px" viewBox="0 0 25 30" xml:space="preserve"> <path d="M9.812,29.7c0,0.166-0.178,0.3-0.398,0.3H2.461c-0.22,0-0.398-0.134-0.398-0.3V0.3c0-0.166,0.178-0.3,0.398-0.3h6.953 c0.22,0,0.398,0.134,0.398,0.3V29.7z"/> <path d="M23.188,29.7c0,0.166-0.178,0.3-0.398,0.3h-6.953c-0.22,0-0.398-0.134-0.398-0.3V0.3c0-0.166,0.178-0.3,0.398-0.3h6.953 c0.22,0,0.398,0.134,0.398,0.3V29.7z"/> </svg>'),
                        "skin-steel" == a.design_skin && (p = v = ""),
                        h = '<div class="the-bg"></div><div class="ap-controls-left">',
                        "skin-silver" == a.design_skin ? h += f : (h += '<div class="con-playpause',
                        "on" == Ja.show_tooltips && (h += " dzstooltip-con"),
                        h += '">',
                        "on" == Ja.show_tooltips && (h += dzsap_generate_keyboard_tooltip(Ja, "pause_play")),
                        h += '<div class="playbtn player-but playbtn-not-skin-silver"><div class="dzsap-play-icon">' + v + '</div><div class="play-icon-hover"></div></div><div class="pausebtn" ',
                        "on" == a.design_animateplaypause && b.addClass("playing-animation"),
                        h += '><div class="pause-icon">' + p + '</div><div class="pause-icon-hover"></div></div></div>'),
                        b.find(".feed-dzsap-after-playpause").length && (h += b.find(".feed-dzsap-after-playpause").eq(0).html(),
                        b.find(".feed-dzsap-after-playpause").remove()),
                        h += "</div>",
                        va && (h += '<div class="controls-right">' + va + "</div>",
                        "skin-redlights" == a.design_skin && a.parentgallery && a.parentgallery.get(0).api_skin_redlights_give_controls_right_to_all && a.parentgallery.get(0).api_skin_redlights_give_controls_right_to_all()),
                        h += '<div class="ap-controls-right">',
                        "skin-silver" == a.design_skin ? h = h + '<div class="controls-volume controls-volume-vertical"><div class="volumeicon"></div><div class="volume-holder"><div class="volume_static"></div><div class="volume_active"></div><div class="volume_cut"></div></div></div></div>' + d : ("skin-redlights" == a.design_skin && "on" != a.disable_volume && (h += '<div class="controls-volume"><div class="volumeicon"></div><div class="volume_static"> <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="57px" height="12px" viewBox="0 0 57 12" enable-background="new 0 0 57 12" xml:space="preserve"> <rect y="9" fill="#414042" width="3" height="3"/> <rect x="6" y="8" fill="#414042" width="3" height="4"/> <rect x="12" y="7" fill="#414042" width="3" height="5"/> <rect x="18" y="5.958" fill="#414042" width="3" height="6"/> <rect x="24" y="4.958" fill="#414042" width="3" height="7"/> <rect x="30" y="4" fill="#414042" width="3" height="8"/> <rect x="36" y="3" fill="#414042" width="3" height="9"/> <rect x="42" y="2" fill="#414042" width="3" height="10"/> <rect x="48" y="1" fill="#414042" width="3" height="11"/> <rect x="54" fill="#414042" width="3" height="12"/> </svg> </div><div class="volume_active"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="57px" height="12px" viewBox="0 0 57 12" enable-background="new 0 0 57 12" xml:space="preserve"> <rect y="9" fill="#414042" width="3" height="3"/> <rect x="6" y="8" fill="#414042" width="3" height="4"/> <rect x="12" y="7" fill="#414042" width="3" height="5"/> <rect x="18" y="5.958" fill="#414042" width="3" height="6"/> <rect x="24" y="4.958" fill="#414042" width="3" height="7"/> <rect x="30" y="4" fill="#414042" width="3" height="8"/> <rect x="36" y="3" fill="#414042" width="3" height="9"/> <rect x="42" y="2" fill="#414042" width="3" height="10"/> <rect x="48" y="1" fill="#414042" width="3" height="11"/> <rect x="54" fill="#414042" width="3" height="12"/> </svg></div><div class="volume_cut"></div></div>'),
                        h += d,
                        "on" != a.disable_timer && (h += '<div class="total-time">00:00</div>')),
                        "skin-silver" != a.design_skin && (h += "</div>");
                    f = "";
                    va && (-1 < String(va).indexOf("dzsap-multisharer-but") && (Qb = !0),
                    "skin-wave" != a.design_skin || "small" != L) && (f += '<div class="extrahtml-in-float-right from-setup_structure from-js-setup_structure">' + va + "</div>");
                    ca.append(h);
                    b.hasClass("skin-wave-mode-alternate") ? 0 == b.find(".scrubbar").length && ca.append(d) : 0 == b.find(".scrubbar").length && ca.prepend(d);
                    E = null;
                    0 < ca.find(".ap-controls-right").length && (E = b.find(".ap-controls-right"));
                    0 < ca.find(".ap-controls-left").length && (Aa = ca.find(".ap-controls-left").eq(0));
                    "skin-pro" == a.design_skin && (E = b.find(".con-controls--right").eq(0));
                    va && f && ("skin-wave" != a.design_skin && "skin-default" != a.design_skin || b.find(".ap-controls-right").eq(0).append(f),
                    "skin-pro" == a.design_skin && b.find(".con-controls--right").eq(0).append(f));
                    b.find(".feed-dzsap-after-con-controls").length && (ca.append(b.find(".feed-dzsap-after-con-controls").eq(0).html()),
                    b.find(".feed-dzsap-after-con-controls").remove());
                    w = a.controls_external_scrubbar ? c(a.controls_external_scrubbar).children(".scrubbar").eq(0) : ca.find(".scrubbar").eq(0);
                    Mc = w.find(".scrub-prog").get(0);
                    Ka = ca.children(".con-controls");
                    P = b.find(".con-playpause").eq(0);
                    Rb = b.find(".con-playpause-con").eq(0);
                    J = b.find(".controls-volume").eq(0);
                    "fake" == b.attr("data-type") && 0 == b.find(".meta-artist").length && b.append('<span class="meta-artist"><span class="the-artist"></span><span class="the-name"></span></span>');
                    A && "reconstruct" != g.call_from || (0 < b.children(".meta-artist").length && (b.hasClass("skin-wave-mode-alternate") ? (Ka.children().last().hasClass("clear") && Ka.children().last().remove(),
                    Ka.append(b.children(".meta-artist"))) : O.append(b.children(".meta-artist"))),
                    O.find(".meta-artist").eq(0).wrap('<div class="meta-artist-con"></div>'),
                    A = O.find(".meta-artist-con").eq(0),
                    "skin-wave" == a.design_skin && (b.find(".dzsap-repeat-button").length ? b.find(".dzsap-repeat-button").after(A) : b.find(".dzsap-loop-button").length && 0 == b.find(".dzsap-loop-button").eq(0).parent().hasClass("feed-dzsap-for-extra-html-right") ? b.find(".dzsap-loop-button").after(A) : Rb.after(A),
                    "alternate" == L && E.before(A)),
                    "skin-aria" == a.design_skin && E.prepend(A),
                    "skin-redlights" != a.design_skin && "skin-steel" != a.design_skin || E.prepend(A),
                    "skin-silver" == a.design_skin && E.append(A),
                    "skin-default" == a.design_skin && E.before(A));
                    "skin-wave" == a.design_skin && "on" != a.disable_timer && "" == a.controls_external_scrubbar && w.append(e);
                    "skin-wave" != a.design_skin && "on" != a.disable_timer && ca.append(e);
                    "on" != a.disable_timer && (I = b.find(".curr-time").eq(0),
                    N = b.find(".total-time").eq(0),
                    "skin-steel" == a.design_skin && 0 == I.length && (N.before('<div class="curr-time">00:00</div> <span class="separator-slash">/</span> '),
                    I = N.prev().prev()));
                    0 < Number(a.sample_time_total) && (B = Number(a.sample_time_total),
                    N && N.html(vb(U)));
                    z();
                    "skin-wave" == a.design_skin && a.parentgallery && "undefined" != typeof a.parentgallery && "on" == a.design_menu_show_player_state_button && ("skin-wave" == a.design_skin ? E ? E.appendOnce('<div class="btn-menu-state player-but"> <div class="the-icon-bg"></div> <svg class="svg-icon" version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="13.25px" height="13.915px" viewBox="0 0 13.25 13.915" enable-background="new 0 0 13.25 13.915" xml:space="preserve"> <path d="M1.327,4.346c-0.058,0-0.104-0.052-0.104-0.115V2.222c0-0.063,0.046-0.115,0.104-0.115H11.58 c0.059,0,0.105,0.052,0.105,0.115v2.009c0,0.063-0.046,0.115-0.105,0.115H1.327z"/> <path d="M1.351,8.177c-0.058,0-0.104-0.051-0.104-0.115V6.054c0-0.064,0.046-0.115,0.104-0.115h10.252 c0.058,0,0.105,0.051,0.105,0.115v2.009c0,0.063-0.047,0.115-0.105,0.115H1.351z"/> <path d="M1.351,12.182c-0.058,0-0.104-0.05-0.104-0.115v-2.009c0-0.064,0.046-0.115,0.104-0.115h10.252 c0.058,0,0.105,0.051,0.105,0.115v2.009c0,0.064-0.047,0.115-0.105,0.115H1.351z"/> </svg>    </div></div>') : console.log("_apControlsRight not found ? ") : O.appendOnce('<div class="btn-menu-state"></div>'));
                    "on" == a.skinwave_place_metaartist_after_volume && J.before(A);
                    a.settings_extrahtml_after_artist && A.find(".the-artist").append(a.settings_extrahtml_after_artist);
                    "on" == a.skinwave_place_thumb_after_volume && J.before(b.find(".the-thumb-con"));
                    "skin-wave" == a.design_skin && (da(),
                    "on" == a.skinwave_timer_static && (I && I.addClass("static"),
                    N && N.addClass("static")),
                    ca.css({}),
                    "canvas" == a.skinwave_wave_mode && setTimeout(function() {
                        b.addClass("scrubbar-loaded");
                        w.parent().addClass("scrubbar-loaded")
                    }, 700));
                    x();
                    b.hasClass("skin-minimal") && (b.find(".the-bg").before('<div class="skin-minimal-bg skin-minimal--outer-bg"></div><div class="skin-minimal-bg skin-minimal--inner-bg-under"></div><div class="skin-minimal-bg skin-minimal--inner-bg"></div><div class="skin-minimal-bg skin-minimal--inner-inner-bg"></div>'),
                    b.find(".the-bg").append('<canvas width="100" height="100" class="playbtn-canvas"/>'),
                    Fa = b.find(".playbtn-canvas").eq(0).get(0),
                    P.children(".playbtn").append(v),
                    P.children(".pausebtn").append(p),
                    setTimeout(function() {
                        Nc = !1
                    }, 200));
                    b.hasClass("skin-minion") && 0 < b.find(".menu-description").length && (P.addClass("with-tooltip"),
                    P.prepend('<span class="dzstooltip" style="left:-7px;">' + b.find(".menu-description").html() + "</span>"),
                    P.children("span").eq(0).css("width", P.children("span").eq(0).textWidth() + 10));
                    "default" == a.player_navigation && (a.parentgallery && (a.player_navigation = "on"),
                    a.parentgallery && a.parentgallery.hasClass("mode-showall") && (a.player_navigation = "off"));
                    "on" == a.disable_player_navigation && (a.player_navigation = "off");
                    "default" == a.player_navigation && (a.player_navigation = "off");
                    "on" == a.player_navigation && (d = '<div class="prev-btn player-but"><div class="the-icon-bg"></div><svg class="svg-icon" version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="14px" height="14px" viewBox="0 0 12.5 12.817" enable-background="new 0 0 12.5 12.817" xml:space="preserve"> <g> <g> <g> <path fill="#D2D6DB" d="M2.581,7.375c-0.744-0.462-1.413-0.94-1.486-1.061C1.021,6.194,1.867,5.586,2.632,5.158l2.35-1.313 c0.765-0.427,1.505-0.782,1.646-0.789s0.257,1.03,0.257,1.905V7.87c0,0.876-0.051,1.692-0.112,1.817 C6.711,9.81,5.776,9.361,5.032,8.898L2.581,7.375z"/> </g> </g> </g> <g> <g> <g> <path fill="#D2D6DB" d="M6.307,7.57C5.413,7.014,4.61,6.441,4.521,6.295C4.432,6.15,5.447,5.42,6.366,4.906l2.82-1.577 c0.919-0.513,1.809-0.939,1.979-0.947s0.309,1.236,0.309,2.288v3.493c0,1.053-0.061,2.033-0.135,2.182S10.144,9.955,9.25,9.4 L6.307,7.57z"/> </g> </g> </g> </svg> </div>',
                    h = '<div class="next-btn player-but"><div class="the-icon-bg"></div><svg class="svg-icon" version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="14px" height="14px" viewBox="0 0 12.5 12.817" enable-background="new 0 0 12.5 12.817" xml:space="preserve"> <g> <g> <g> <path fill="#D2D6DB" d="M9.874,5.443c0.744,0.462,1.414,0.939,1.486,1.06c0.074,0.121-0.771,0.729-1.535,1.156L7.482,8.967 C6.719,9.394,5.978,9.75,5.837,9.756C5.696,9.761,5.581,8.726,5.581,7.851V4.952c0-0.875,0.05-1.693,0.112-1.816 c0.062-0.124,0.995,0.326,1.739,0.788L9.874,5.443z"/> </g> </g> </g> <g> <g> <g> <path fill="#D2D6DB" d="M6.155,5.248c0.893,0.556,1.696,1.129,1.786,1.274c0.088,0.145-0.928,0.875-1.847,1.389l-2.811,1.57 c-0.918,0.514-1.808,0.939-1.978,0.947c-0.169,0.008-0.308-1.234-0.308-2.287V4.66c0-1.052,0.061-2.034,0.135-2.182 s1.195,0.391,2.089,0.947L6.155,5.248z"/> </g> </g> </g> </svg>  </div>',
                    "skin-steel" == a.design_skin && (d = '<div class="prev-btn player-but"><svg class="svg1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="10px" height="13.325px" viewBox="0 0 10 13.325" enable-background="new 0 0 10 13.325" xml:space="preserve"> <g id="Layer_2"> <polygon opacity="0.5" fill="#E6E7E8" points="3.208,7.674 5.208,9.104 5.208,5.062 3.208,5.652 "/> </g> <g id="Layer_1"> <rect x="0.306" y="3.074" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -1.4203 4.7299)" fill="#E6E7E8" width="9.386" height="2.012"/> <rect x="0.307" y="8.29" transform="matrix(0.7072 0.707 -0.707 0.7072 8.0362 -0.8139)" fill="#E6E7E8" width="9.387" height="2.012"/> </g> </svg> <svg class="svg2"  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="10px" height="13.325px" viewBox="0 0 10 13.325" enable-background="new 0 0 10 13.325" xml:space="preserve"> <g id="Layer_2"> <polygon opacity="0.5" fill="#E6E7E8" points="3.208,7.674 5.208,9.104 5.208,5.062 3.208,5.652 "/> </g> <g id="Layer_1"> <rect x="0.306" y="3.074" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -1.4203 4.7299)" fill="#E6E7E8" width="9.386" height="2.012"/> <rect x="0.307" y="8.29" transform="matrix(0.7072 0.707 -0.707 0.7072 8.0362 -0.8139)" fill="#E6E7E8" width="9.387" height="2.012"/> </g> </svg></div>',
                    h = '<div class="next-btn player-but"><svg class="svg1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="10px" height="13.325px" viewBox="0 0 10 13.325" enable-background="new 0 0 10 13.325" xml:space="preserve"> <g id="Layer_2"> <polygon opacity="0.5" fill="#E6E7E8" points="7.035,5.695 5.074,4.292 5.074,8.257 7.035,7.678 "/> </g> <g id="Layer_1"> <rect x="0.677" y="8.234" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 15.532 12.0075)" fill="#E6E7E8" width="9.204" height="1.973"/> <rect x="0.674" y="3.118" transform="matrix(-0.7072 -0.707 0.707 -0.7072 6.1069 10.7384)" fill="#E6E7E8" width="9.206" height="1.974"/> </g> </svg><svg class="svg2" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="10px" height="13.325px" viewBox="0 0 10 13.325" enable-background="new 0 0 10 13.325" xml:space="preserve"> <g id="Layer_2"> <polygon opacity="0.5" fill="#E6E7E8" points="7.035,5.695 5.074,4.292 5.074,8.257 7.035,7.678 "/> </g> <g id="Layer_1"> <rect x="0.677" y="8.234" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 15.532 12.0075)" fill="#E6E7E8" width="9.204" height="1.973"/> <rect x="0.674" y="3.118" transform="matrix(-0.7072 -0.707 0.707 -0.7072 6.1069 10.7384)" fill="#E6E7E8" width="9.206" height="1.974"/> </g> </svg></div>'),
                    e = d + h,
                    "skin-wave" == a.design_skin && "small" == L || "skin-aria" == a.design_skin ? (P.before(d),
                    P.after(h)) : "skin-wave" == a.design_skin ? "on" == a.player_navigation && (Rb.prependOnce(d, ".prev-btn"),
                    Rb.appendOnce(h, ".next-btn")) : "skin-steel" == a.design_skin ? (Aa.prependOnce(d, ".prev-btn"),
                    0 < Aa.children(".the-thumb-con").length ? 0 < Aa.children(".the-thumb-con").eq(0).length && 0 == Aa.children(".the-thumb-con").eq(0).prev().hasClass("next-btn") && Aa.children(".the-thumb-con").eq(0).before(h) : Aa.appendOnce(h, ".next-btn")) : O.appendOnce(e, ".prev-btn"));
                    b.find(".extra-html-extra").length && ("" == a.settings_extrahtml && (a.settings_extrahtml = " "),
                    d = b.find(".extra-html-extra").eq(0).html(),
                    d.length && (a.settings_extrahtml = d,
                    b.find(".extra-html-extra").eq(0).html("")));
                    b.hasClass("skinvariation-wave-bigtitles") && b.find(".controls-volume").length && 0 == A.find(".controls-volume").length && (A.append("<br>"),
                    A.append(b.find(".controls-volume")));
                    b.hasClass("skinvariation-wave-righter") && (ca.appendOnce('<div class="playbuttons-con"></div>'),
                    b.find(".playbuttons-con").eq(0).append(b.find(".con-playpause-con")));
                    "skin-pro" == a.design_skin && (E.append(I),
                    E.append(N));
                    "skin-silver" == a.design_skin && (w.after(E),
                    Aa.prepend(A),
                    Aa.append(I),
                    E.append(N));
                    "skin-redlights" == a.design_skin && (E.append('<div class="ap-controls-right--top"></div>'),
                    E.append('<div class="ap-controls-right--bottom"></div>'),
                    E.find(".ap-controls-right--top").append(E.find(".meta-artist-con")),
                    E.find(".ap-controls-right--top").append(E.find(".controls-volume")),
                    E.find(".ap-controls-right--bottom").append(E.find(".scrubbar")));
                    "reconstruct" == g.call_from && b.hasClass("skin-silver") && Aa.append(b.find(".con-playpause"));
                    Qb && x();
                    Sb();
                    Ta();
                    b.addClass("structure-setuped")
                }
                function Ba() {
                    C && mc && mc.each(function() {
                        var b = c(this);
                        "on" == a.skinwave_comments_process_in_php && b && b.hasClass && b.hasClass("dzstooltip-con") && !b.find(".dzstooltip > .dzstooltip--inner").length && (b.find(".dzstooltip").wrapInner('<div class="dzstooltip--inner"></div>'),
                        b.find(".the-avatar").addClass("tooltip-indicator"),
                        b.find(".dzstooltip").before(b.find(".tooltip-indicator")),
                        b.find(".dzstooltip").addClass("talign-start style-rounded color-dark-light"));
                        C.append(b)
                    })
                }
                function Ta() {
                    "skin-wave" == a.design_skin && "bigwavo" == L && (O.after(w),
                    b.find(".feed-description") && (Ka.after(b.find(".feed-description").eq(0)),
                    Ka.next().removeClass("feed-description").addClass("song-desc")));
                    0 == nb && A.find(".the-name").length && 0 < A.find(".the-name").eq(0).text().length ? (nb = !1,
                    -1 < A.find(".the-name").eq(0).html().indexOf("&nbsp;&nbsp;") && (nb = !0)) : nb = !0;
                    0 == ob && A.find(".the-name").length && 0 < A.find(".the-artist").eq(0).text().length ? (ob = !1,
                    -1 < A.find(".the-name").eq(0).html().indexOf("&nbsp;&nbsp;") && (ob = !0)) : ob = !0;
                    "on" == a.disable_scrub && b.addClass("disable-scrubbar");
                    "on" == a.design_animateplaypause && b.addClass("playing-animation");
                    "skin-wave" == a.design_skin && "" != a.embed_code && ("skin-wave" == a.design_skin ? "on" == a.enable_embed_button && E && E.appendOnce('<div class="btn-embed-code-con dzstooltip-con "><div class="btn-embed-code player-but"> <div class="the-icon-bg"></div>  <svg class="svg-icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="10.975px" height="14.479px" viewBox="0 0 10.975 14.479" enable-background="new 0 0 10.975 14.479" xml:space="preserve"> <g> <path d="M2.579,1.907c0.524-0.524,1.375-0.524,1.899,0l4.803,4.804c0.236-0.895,0.015-1.886-0.687-2.587L5.428,0.959 c-1.049-1.05-2.75-1.05-3.799,0L0.917,1.671c-1.049,1.05-1.049,2.751,0,3.801l3.167,3.166c0.7,0.702,1.691,0.922,2.587,0.686 L1.867,4.52c-0.524-0.524-0.524-1.376,0-1.899L2.579,1.907z M5.498,13.553c1.05,1.05,2.75,1.05,3.801,0l0.712-0.713 c1.05-1.05,1.05-2.75,0-3.8L6.843,5.876c-0.701-0.7-1.691-0.922-2.586-0.686l4.802,4.803c0.524,0.525,0.524,1.376,0,1.897 l-0.713,0.715c-0.523,0.522-1.375,0.522-1.898,0L1.646,7.802c-0.237,0.895-0.014,1.886,0.686,2.586L5.498,13.553z"/> </g> </svg> </div><span class="dzstooltip transition-slidein arrow-bottom align-right skin-black " style="width: 350px; "><span style="max-height: 150px; overflow:hidden; display: block;">' + a.embed_code + "</span></span></div>") : "on" == a.enable_embed_button && O.appendOnce('<div class="btn-embed-code-con dzstooltip-con "><div class="btn-embed-code player-but "> <div class="the-icon-bg"></div> <svg class="svg-icon" version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15px" height="15px" viewBox="0 0 15 15" xml:space="preserve"> <g id="Layer_1"> <polygon fill="#E6E7E8" points="1.221,7.067 0.494,5.422 4.963,1.12 5.69,2.767 "/> <polygon fill="#E6E7E8" points="0.5,5.358 1.657,4.263 3.944,10.578 2.787,11.676 "/> <polygon fill="#E6E7E8" points="13.588,9.597 14.887,8.34 12.268,2.672 10.969,3.93 "/> <polygon fill="#E6E7E8" points="14.903,8.278 14.22,6.829 9.714,11.837 10.397,13.287 "/> </g> <g id="Layer_2"> <rect x="6.416" y="1.713" transform="matrix(0.9663 0.2575 -0.2575 0.9663 2.1699 -1.6329)" fill="#E6E7E8" width="1.805" height="11.509"/> </g> </svg></div><span class="dzstooltip transition-slidein arrow-bottom align-right skin-black " style="width: 350px; "><span style="max-height: 150px; overflow:hidden; display: block;">' + a.embed_code + "</span></span></div>"),
                    b.on("click", ".btn-embed-code-con, .btn-embed", function() {
                        var a = c(this);
                        fb(a.find(".dzstooltip").get(0))
                    }),
                    b.on("click", ".copy-embed-code-btn", function() {
                        var a = c(this);
                        fb(a.parent().parent().find(".dzstooltip--inner > span").get(0));
                        document.execCommand("copy");
                        setTimeout(function() {
                            fb(a.get(0))
                        }, 100)
                    }));
                    "on" == a.footer_btn_playlist && 0 == E.find(".btn-footer-playlist").length && (E.append('<div class="btn-footer-playlist for-hover dzstooltip-con player-but"> <div class="tooltip-indicator tooltip-indicator--btn-footer-playlist"><div class="the-icon-bg"></div> <svg class="svg-icon" version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="13.25px" height="13.915px" viewBox="0 0 13.25 13.915" enable-background="new 0 0 13.25 13.915" xml:space="preserve"> <path d="M1.327,4.346c-0.058,0-0.104-0.052-0.104-0.115V2.222c0-0.063,0.046-0.115,0.104-0.115H11.58 c0.059,0,0.105,0.052,0.105,0.115v2.009c0,0.063-0.046,0.115-0.105,0.115H1.327z"/> <path d="M1.351,8.177c-0.058,0-0.104-0.051-0.104-0.115V6.054c0-0.064,0.046-0.115,0.104-0.115h10.252 c0.058,0,0.105,0.051,0.105,0.115v2.009c0,0.063-0.047,0.115-0.105,0.115H1.351z"/> <path d="M1.351,12.182c-0.058,0-0.104-0.05-0.104-0.115v-2.009c0-0.064,0.046-0.115,0.104-0.115h10.252 c0.058,0,0.105,0.051,0.105,0.115v2.009c0,0.064-0.047,0.115-0.105,0.115H1.351z"/> </svg>    </div><div class="dzstooltip playlist-tooltip style-default color-light-dark arrow-bottom talign-end transition-scaleup active2"><div class="dzstooltip--inner"> </div></div></div>'),
                    ea = b.find(".playlist-tooltip"),
                    setTimeout(function() {
                        Ia()
                    }, 100),
                    setTimeout(function() {}, 1E3));
                    "" != a.settings_extrahtml && (-1 < String(a.settings_extrahtml).indexOf("{{get_likes}}") && (fa++,
                    nc()),
                    -1 < String(a.settings_extrahtml).indexOf("{{get_plays}}") ? (fa++,
                    oc()) : 1 === Ua && (ib(),
                    Ua = 2),
                    -1 < String(a.settings_extrahtml).indexOf("{{get_rates}}") && (fa++,
                    pc()),
                    a.settings_extrahtml = String(a.settings_extrahtml).replace("{{heart_svg}}", '<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.0" width="15" height="15"  viewBox="0 0 645 700" id="svg2"> <defs id="defs4" /> <g id="layer1"> <path d="M 297.29747,550.86823 C 283.52243,535.43191 249.1268,505.33855 220.86277,483.99412 C 137.11867,420.75228 125.72108,411.5999 91.719238,380.29088 C 29.03471,322.57071 2.413622,264.58086 2.5048478,185.95124 C 2.5493594,147.56739 5.1656152,132.77929 15.914734,110.15398 C 34.151433,71.768267 61.014996,43.244667 95.360052,25.799457 C 119.68545,13.443675 131.6827,7.9542046 172.30448,7.7296236 C 214.79777,7.4947896 223.74311,12.449347 248.73919,26.181459 C 279.1637,42.895777 310.47909,78.617167 316.95242,103.99205 L 320.95052,119.66445 L 330.81015,98.079942 C 386.52632,-23.892986 564.40851,-22.06811 626.31244,101.11153 C 645.95011,140.18758 648.10608,223.6247 630.69256,270.6244 C 607.97729,331.93377 565.31255,378.67493 466.68622,450.30098 C 402.0054,497.27462 328.80148,568.34684 323.70555,578.32901 C 317.79007,589.91654 323.42339,580.14491 297.29747,550.86823 z" id="path2417" style="" /> <g transform="translate(129.28571,-64.285714)" id="g2221" /> </g> </svg> '),
                    a.settings_extrahtml = String(a.settings_extrahtml).replace("{{embed_code}}", a.embed_code),
                    0 == fa && b.find(".extra-html").addClass("active"),
                    setTimeout(function() {
                        b.find(".extra-html").addClass("active");
                        0 == b.find(".float-left").length ? b.find(".extra-html").append(b.find(".extra-html-extra")) : b.find(".extra-html .float-left").append(b.find(".extra-html-extra"));
                        b.find(".extra-html-extra").children().eq(0);
                        b.find(".extra-html-extra").children().unwrap();
                        -1 < b.find(".extra-html").html().indexOf("dzsap-multisharer-but") && (Qb = !0)
                    }, 2E3));
                    b.find(".con-after-playpause").length && P.after(b.find(".con-after-playpause").eq(0));
                    0 < b.find(".afterplayer").length && b.append(b.find(".afterplayer"))
                }
                function Sb() {
                    b.hasClass("zoomsounds-wrapper-bg-bellow") && 0 == b.find(".dzsap-wrapper-buts").length && (b.append('<div class="temp-wrapper"></div>'),
                    b.find(".temp-wrapper").append(va),
                    b.find(".temp-wrapper").children("*:not(.dzsap-wrapper-but)").remove(),
                    b.find(".temp-wrapper > .dzsap-wrapper-but").unwrap(),
                    b.children(".dzsap-wrapper-but").each(function() {
                        var a = c(this).html();
                        a = a.replace("{{heart_svg}}", '<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.0" width="15" height="15"  viewBox="0 0 645 700" id="svg2"> <defs id="defs4" /> <g id="layer1"> <path d="M 297.29747,550.86823 C 283.52243,535.43191 249.1268,505.33855 220.86277,483.99412 C 137.11867,420.75228 125.72108,411.5999 91.719238,380.29088 C 29.03471,322.57071 2.413622,264.58086 2.5048478,185.95124 C 2.5493594,147.56739 5.1656152,132.77929 15.914734,110.15398 C 34.151433,71.768267 61.014996,43.244667 95.360052,25.799457 C 119.68545,13.443675 131.6827,7.9542046 172.30448,7.7296236 C 214.79777,7.4947896 223.74311,12.449347 248.73919,26.181459 C 279.1637,42.895777 310.47909,78.617167 316.95242,103.99205 L 320.95052,119.66445 L 330.81015,98.079942 C 386.52632,-23.892986 564.40851,-22.06811 626.31244,101.11153 C 645.95011,140.18758 648.10608,223.6247 630.69256,270.6244 C 607.97729,331.93377 565.31255,378.67493 466.68622,450.30098 C 402.0054,497.27462 328.80148,568.34684 323.70555,578.32901 C 317.79007,589.91654 323.42339,580.14491 297.29747,550.86823 z" id="path2417" style="" /> <g transform="translate(129.28571,-64.285714)" id="g2221" /> </g> </svg> ');
                        a = a.replace("{{svg_share_icon}}", '<svg class="svg-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 511.626 511.627" style="enable-background:new 0 0 511.626 511.627;" xml:space="preserve"> <g> <path d="M506.206,179.012L360.025,32.834c-3.617-3.617-7.898-5.426-12.847-5.426s-9.233,1.809-12.847,5.426 c-3.617,3.619-5.428,7.902-5.428,12.85v73.089h-63.953c-135.716,0-218.984,38.354-249.823,115.06C5.042,259.335,0,291.03,0,328.907 c0,31.594,12.087,74.514,36.259,128.762c0.57,1.335,1.566,3.614,2.996,6.849c1.429,3.233,2.712,6.088,3.854,8.565 c1.146,2.471,2.384,4.565,3.715,6.276c2.282,3.237,4.948,4.859,7.994,4.859c2.855,0,5.092-0.951,6.711-2.854 c1.615-1.902,2.424-4.284,2.424-7.132c0-1.718-0.238-4.236-0.715-7.569c-0.476-3.333-0.715-5.564-0.715-6.708 c-0.953-12.938-1.429-24.653-1.429-35.114c0-19.223,1.668-36.449,4.996-51.675c3.333-15.229,7.948-28.407,13.85-39.543 c5.901-11.14,13.512-20.745,22.841-28.835c9.325-8.09,19.364-14.702,30.118-19.842c10.756-5.141,23.413-9.186,37.974-12.135 c14.56-2.95,29.215-4.997,43.968-6.14s31.455-1.711,50.109-1.711h63.953v73.091c0,4.948,1.807,9.232,5.421,12.847 c3.62,3.613,7.901,5.424,12.847,5.424c4.948,0,9.232-1.811,12.854-5.424l146.178-146.183c3.617-3.617,5.424-7.898,5.424-12.847 C511.626,186.92,509.82,182.636,506.206,179.012z" fill="#696969"/> </g></svg> ');
                        c(this).get(0) && -1 < c(this).get(0).outerHTML.indexOf("dzsap-multisharer-but") && (Qb = !0);
                        c(this).html(a)
                    }).wrapAll('<div class="dzsap-wrapper-buts"></div>'));
                    "skin-customcontrols" == a.design_skin && (b.html(String(b.html()).replace("{{svg_play_icon}}", '<svg class="svg-icon" version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11.161px" height="12.817px" viewBox="0 0 11.161 12.817" enable-background="new 0 0 11.161 12.817" xml:space="preserve"> <g> <g> <g> <path fill="#D2D6DB" d="M8.233,4.589c1.401,0.871,2.662,1.77,2.801,1.998c0.139,0.228-1.456,1.371-2.896,2.177l-4.408,2.465 c-1.44,0.805-2.835,1.474-3.101,1.484c-0.266,0.012-0.483-1.938-0.483-3.588V3.666c0-1.65,0.095-3.19,0.212-3.422 c0.116-0.232,1.875,0.613,3.276,1.484L8.233,4.589z"/> </g> </g> </g> </svg>  ')),
                    b.html(String(b.html()).replace("{{svg_pause_icon}}", p)))
                }
                function x() {
                    b.find(".dzsap-multisharer-but").data("cthis", b);
                    b.data("embed_code", a.embed_code);
                    Qb && window.dzsap_init_multisharer()
                }
                function Q(d) {
                    var g = {
                        call_from: "default"
                    };
                    d && c.extend(g, d);
                    d = [];
                    if (0 == ("on" == a.pcm_data_try_to_generate && "on" == a.pcm_data_try_to_generate_wait_for_real_pcm)) {
                        for (g = 0; 200 > g; g++)
                            d[g] = Number(Math.random()).toFixed(2);
                        d = JSON.stringify(d);
                        b.addClass("rnd-pcm-for-now");
                        b.attr("data-pcm", d)
                    }
                    R()
                }
                function R(b) {
                    var d = {
                        prepare_for_transition_in: !1
                    };
                    b && (d = c.extend(d, b));
                    b = '<canvas class="scrub-bg-img';
                    d.prepare_for_transition_in && (b += " transitioning-in");
                    b += '" ></canvas>';
                    w.children(".scrub-bg").eq(0).append(b);
                    b = ".scrub-bg-img";
                    d.prepare_for_transition_in && (b += ".transitioning-in");
                    Za = w.find(b).eq(0);
                    b = '<canvas class="scrub-prog-img';
                    d.prepare_for_transition_in && (b += " transitioning-in");
                    b += '" ></canvas>';
                    w.children(".scrub-prog").eq(0).find(".scrub-prog-img");
                    w.children(".scrub-prog").eq(0).append(b);
                    b = ".scrub-prog-img";
                    d.prepare_for_transition_in && (b += ".transitioning-in");
                    $a = w.find(b).eq(0);
                    "on" == a.skinwave_enableSpectrum && $a.hide()
                }
                function da() {
                    if ("on" != a.skinwave_enableSpectrum)
                        if ("canvas" == a.skinwave_wave_mode)
                            b.attr("data-pcm") ? (cb = !0,
                            R()) : Q();
                        else {
                            if ("image" == a.skinwave_wave_mode) {
                                var d = '<img class="scrub-bg--img" src="' + b.attr("data-scrubbg") + '"/>';
                                w.children(".scrub-bg").eq(0).append(d);
                                setTimeout(function() {
                                    sb()
                                }, 300);
                                d = '<img class="scrub-prog--img" src="' + b.attr("data-scrubprog") + '"/>';
                                w.children(".scrub-prog").eq(0).append(d);
                                setTimeout(function() {
                                    sb()
                                }, 300)
                            }
                        }
                    else
                        R(),
                        Ca = b.find(".scrub-bg-img").eq(0),
                        Ca.get(0).getContext("2d")
                }
                function Ha(b, g, h, e) {
                    var d = {
                        call_from: "default"
                    };
                    e && (d = c.extend(d, e));
                    "canvas_normal_pcm_bg" == d.call_from && (Tb = h,
                    -1 < h.indexOf(",") && (Tb = h.split(",")[0]));
                    e = c(b);
                    if (!e || !e.get(0))
                        return !1;
                    e = e.get(0).getContext("2d");
                    var k = [];
                    w && $a && ($a.width(w.width()),
                    b.width = w.width(),
                    b.height = w.height());
                    e.imageSmoothingEnabled = !1;
                    e.imageSmoothing = !1;
                    e.imageSmoothingQuality = "high";
                    e.webkitImageSmoothing = !1;
                    if (!g)
                        return setTimeout(function() {}, 1E3),
                        !1;
                    if ("object" == typeof g)
                        k = g;
                    else
                        try {
                            k = JSON.parse(g)
                        } catch (Ud) {}
                    var m = g = 0;
                    for (g = 0; g < k.length; g++)
                        k[g] > m && (m = k[g]);
                    var n = [];
                    for (g = 0; g < k.length; g++)
                        n[g] = parseFloat(Math.abs(k[g]) / Number(m));
                    k = n;
                    b.width = w.width();
                    g = b.width;
                    b = b.height;
                    e.clearRect(0, 0, g, b);
                    m = parseInt(a.skinwave_wave_mode_canvas_waves_number);
                    n = parseFloat(a.skinwave_wave_mode_canvas_waves_padding);
                    1 == m && (m = g / m);
                    2 == m && (m = g / 2);
                    3 == m && (m = g / 3);
                    var u = parseFloat(a.skinwave_wave_mode_canvas_reflection_size);
                    1 > g / m && (m = Math.ceil(m / 3));
                    var q = Math.ceil(g / m)
                      , r = 1 - u;
                    0 == q && (q = 1,
                    n = 0);
                    1 == q && (n /= 2);
                    var l = 0;
                    g = h.replace("#", "");
                    var t = [];
                    -1 < g.indexOf(",") && (t = g.split(","));
                    var La = ""
                      , v = "";
                    "spectrum" == d.call_from && (La = a.design_wave_color_progress,
                    La = La.replace("#", ""),
                    v = [],
                    -1 < La.indexOf(",") && (v = La.split(",")));
                    var W = !1;
                    for (g = 0; g < m; g++) {
                        wb = !0;
                        e.save();
                        var p = Math.ceil(k.length / m * g);
                        g < m / 5 && .1 > k[p] && (k[p] = .1);
                        k.length > 2.5 * m && 0 < g && g < k.length - 1 && (k[p] = Math.abs(k[p] + k[p - 1] + k[p + 1]) / 3);
                        p = Math.abs(k[p] * b * r);
                        "on" == a.skinwave_wave_mode_canvas_normalize && (p = p / 1.5 + l / 2.5);
                        l = p;
                        e.lineWidth = 0;
                        p = Math.floor(p);
                        var gb = Math.ceil(b * r - p);
                        "reflecto" == a.skinwave_wave_mode_canvas_mode && p++;
                        e.beginPath();
                        e.rect(g * q, gb, q - n, p);
                        "spectrum" == d.call_from && (W = g / m < H / B ? !0 : !1);
                        W ? (e.fillStyle = "#" + La,
                        v.length && (p = e.createLinearGradient(0, 0, 0, b),
                        p.addColorStop(0, "#" + v[0]),
                        p.addColorStop(1, "#" + v[1]),
                        e.fillStyle = p),
                        ec && (g / m < aa / ma || g / m > eb / ma) && (e.fillStyle = f(Tb, 0))) : (e.fillStyle = h,
                        t.length && (p = e.createLinearGradient(0, 0, 0, b),
                        t[0] = String(t[0]).replace("#", ""),
                        t[1] = String(t[1]).replace("#", ""),
                        p.addColorStop(0, "#" + t[0]),
                        p.addColorStop(1, "#" + t[1]),
                        e.fillStyle = p),
                        ec && (g / m < aa / ma || g / m > eb / ma) && (e.fillStyle = f(Tb, .5),
                        -1 < d.call_from.indexOf("pcm_prog") && (wb = !1)));
                        wb && (e.fill(),
                        e.closePath());
                        e.restore()
                    }
                    if (0 < u)
                        for (g = 0; g < m; g++)
                            wb = !0,
                            p = Math.ceil(k.length / m * g),
                            l = Math.abs(k[p] * b * u),
                            e.beginPath(),
                            e.rect(g * q, b * r, q - n, l),
                            "spectrum" == d.call_from && (W = g / m < H / B ? !0 : !1),
                            W ? ("reflecto" != a.skinwave_wave_mode_canvas_mode && (e.fillStyle = f(La, .25)),
                            v.length && (p = e.createLinearGradient(0, 0, 0, b),
                            l = f("#" + v[1], .25),
                            "reflecto" == a.skinwave_wave_mode_canvas_mode && (l = f("#" + v[1], 1)),
                            p.addColorStop(0, l),
                            l = f("#" + v[0], .25),
                            "reflecto" == a.skinwave_wave_mode_canvas_mode && (l = f("#" + v[0], 1)),
                            p.addColorStop(1, l),
                            e.fillStyle = p)) : (e.fillStyle = h,
                            "reflecto" != a.skinwave_wave_mode_canvas_mode && (e.fillStyle = f(h, .25)),
                            t.length && (p = e.createLinearGradient(0, 0, 0, b),
                            l = f("#" + t[1], .25),
                            "reflecto" == a.skinwave_wave_mode_canvas_mode && (l = f("#" + t[1], 1)),
                            p.addColorStop(0, l),
                            l = f("#" + t[0], .25),
                            "reflecto" == a.skinwave_wave_mode_canvas_mode && (l = f("#" + t[0], 1)),
                            p.addColorStop(1, l),
                            e.fillStyle = p),
                            ec && (g / m < aa / ma || g / m > eb / ma) && (e.fillStyle = f(Tb, .5),
                            -1 < d.call_from.indexOf("pcm_prog") && (wb = !1))),
                            wb && (e.fill(),
                            e.closePath());
                    setTimeout(function() {
                        sb()
                    }, 100)
                }
                function nc(d) {
                    d = {
                        action: "dzsap_get_likes",
                        postdata: d,
                        playerid: D
                    };
                    a.settings_php_handler && c.ajax({
                        type: "POST",
                        url: a.settings_php_handler,
                        data: d,
                        success: function(a) {
                            var d = !1;
                            -1 < a.indexOf("likesubmitted") && (a = a.replace("likesubmitted", ""),
                            d = !0);
                            "" == a && (a = 0);
                            var c = b.find(".extra-html").eq(0);
                            c.css("opacity", "");
                            var g = c.html();
                            g = g.replace("{{get_likes}}", a);
                            c.html(g);
                            fa--;
                            d && b.find(".extra-html").find(".btn-like").addClass("active");
                            0 == fa && b.find(".extra-html").addClass("active")
                        },
                        error: function(a) {
                            fa--;
                            0 == fa && b.find(".extra-html").addClass("active")
                        }
                    })
                }
                function pc(d) {
                    d = {
                        action: "dzsap_get_rate",
                        postdata: d,
                        playerid: D
                    };
                    a.settings_php_handler && c.ajax({
                        type: "POST",
                        url: a.settings_php_handler,
                        data: d,
                        success: function(d) {
                            -1 < d.indexOf("likesubmitted") && (d = d.replace("likesubmitted", ""));
                            "" == d && (d = "0|0");
                            d = d.split("|");
                            jd = d[1];
                            b.find(".extra-html .counter-rates .the-number").eq(0).html(jd);
                            fa--;
                            b.find(".star-rating-set-clip").width(d[0] * (parseInt(b.find(".star-rating-bg").width(), 10) / 5));
                            "undefined" != typeof d[2] && (Ga = d[2],
                            a.parentgallery && void 0 != c(a.parentgallery).get(0) && void 0 != c(a.parentgallery).get(0).api_player_rateSubmitted && c(a.parentgallery).get(0).api_player_rateSubmitted());
                            0 >= fa && b.find(".extra-html").addClass("active")
                        },
                        error: function(a) {
                            fa--;
                            0 >= fa && b.find(".extra-html").addClass("active")
                        }
                    })
                }
                function oc(d) {
                    d = {
                        action: "dzsap_get_views",
                        postdata: d,
                        playerid: D
                    };
                    "" == d.playerid && (d.playerid = dzs_clean_string(xa));
                    a.settings_php_handler && c.ajax({
                        type: "POST",
                        url: a.settings_php_handler,
                        data: d,
                        success: function(a) {
                            -1 < a.indexOf("viewsubmitted") && (a = a.replace("viewsubmitted", ""),
                            ia = "on",
                            Ua = 0);
                            "" == a && (a = 0);
                            if (-1 < String(a).indexOf("{{theip")) {
                                var d = /{\{theip-(.*?)}}/g.exec(a);
                                d[1] && (kd = d[1]);
                                a = a.replace(/{\{theip-(.*?)}}/g, "")
                            }
                            1 == Ua && (ib(),
                            a = Number(a) + Ua,
                            Ua = 2);
                            d = b.find(".extra-html").eq(0).html();
                            d = d.replace("{{get_plays}}", a);
                            b.find(".extra-html").eq(0).html(d);
                            fa--;
                            0 == fa && b.find(".extra-html").addClass("active")
                        },
                        error: function(a) {
                            fa--;
                            0 == fa && b.find(".extra-html").addClass("active")
                        }
                    })
                }
                function qa(d) {
                    d = {
                        action: "dzsap_submit_rate",
                        postdata: d,
                        playerid: D
                    };
                    -1 < Ga || (b.find(".star-rating-con").addClass("just-rated"),
                    a.settings_php_handler && c.ajax({
                        type: "POST",
                        url: a.settings_php_handler,
                        data: d,
                        success: function(d) {
                            var g = {};
                            try {
                                g = JSON.parse(d)
                            } catch (Oa) {
                                console.log(Oa)
                            }
                            b.find(".star-rating-set-clip").outerWidth();
                            b.find(".star-rating-bg").outerWidth();
                            d = parseInt(b.find(".counter-rates .the-number").html(), 10);
                            d++;
                            setTimeout(function() {
                                b.find(".star-rating-con").removeClass("just-rated")
                            }, 100);
                            b.find(".counter-rates .the-number").html(g.number);
                            b.find(".star-rating-con").attr("data-initial-rating-index", Number(g.index) / 5);
                            b.find(".star-rating-con .rating-prog").css("width", Number(g.index) / 5 * 100 + "%");
                            a.parentgallery && void 0 != c(a.parentgallery).get(0) && void 0 != c(a.parentgallery).get(0).api_player_rateSubmitted && c(a.parentgallery).get(0).api_player_rateSubmitted()
                        },
                        error: function(d) {
                            var g = b.find(".star-rating-set-clip").outerWidth() / b.find(".star-rating-bg").outerWidth();
                            d = parseInt(b.find(".counter-rates .the-number").html(), 10);
                            d++;
                            g = (5 * (d - 1) * g + Va) / d;
                            b.find(".star-rating-set-clip").width(g * (parseInt(b.find(".star-rating-bg").width(), 10) / 5));
                            b.find(".counter-rates .the-number").html(d);
                            a.parentgallery && void 0 != c(a.parentgallery).get(0) && void 0 != c(a.parentgallery).get(0).api_player_rateSubmitted && c(a.parentgallery).get(0).api_player_rateSubmitted()
                        }
                    }))
                }
                function wa(b) {
                    b = {
                        action: "dzsap_submit_download",
                        postdata: b,
                        playerid: D
                    };
                    -1 < Ga || a.settings_php_handler && c.ajax({
                        type: "POST",
                        url: a.settings_php_handler,
                        data: b,
                        success: function(a) {},
                        error: function(a) {}
                    })
                }
                function ib(d) {
                    d = {
                        action: "dzsap_submit_views",
                        postdata: 1,
                        playerid: D,
                        currip: kd
                    };
                    b.attr("data-playerid-for-views") && (d.playerid = b.attr("data-playerid-for-views"));
                    "" == d.playerid && (d.playerid = dzs_clean_string(xa));
                    a.settings_php_handler && (c.ajax({
                        type: "POST",
                        url: a.settings_php_handler,
                        data: d,
                        success: function(a) {
                            a = b.find(".counter-hits .the-number").html();
                            a = parseInt(a, 10);
                            2 != Ua && a++;
                            b.find(".counter-hits .the-number").html(a);
                            ia = "on"
                        },
                        error: function(a) {
                            a = b.find(".counter-hits .the-number").html();
                            a = parseInt(a, 10);
                            a++;
                            b.find(".counter-hits .the-number").html(a);
                            ia = "on"
                        }
                    }),
                    ia = "on")
                }
                function jb(d) {
                    d = {
                        action: "dzsap_submit_like",
                        postdata: d,
                        playerid: D
                    };
                    b.find(".btn-like").addClass("disabled");
                    (a.settings_php_handler || b.hasClass("is-preview")) && c.ajax({
                        type: "POST",
                        url: a.settings_php_handler,
                        data: d,
                        success: function(a) {
                            b.find(".btn-like").addClass("active");
                            b.find(".btn-like").removeClass("disabled");
                            a = b.find(".counter-likes .the-number").html();
                            a = parseInt(a, 10);
                            a++;
                            b.find(".counter-likes .the-number").html(a)
                        },
                        error: function(a) {
                            b.find(".btn-like").addClass("active");
                            b.find(".btn-like").removeClass("disabled");
                            a = b.find(".counter-likes .the-number").html();
                            a = parseInt(a, 10);
                            a++;
                            b.find(".counter-likes .the-number").html(a)
                        }
                    })
                }
                function Ub(d) {
                    d = {
                        action: "dzsap_retract_like",
                        postdata: d,
                        playerid: D
                    };
                    b.find(".btn-like").addClass("disabled");
                    a.settings_php_handler && c.ajax({
                        type: "POST",
                        url: a.settings_php_handler,
                        data: d,
                        success: function(a) {
                            b.find(".btn-like").removeClass("active");
                            b.find(".btn-like").removeClass("disabled");
                            a = b.find(".counter-likes .the-number").html();
                            a = parseInt(a, 10);
                            a--;
                            b.find(".counter-likes .the-number").html(a)
                        },
                        error: function(a) {
                            b.find(".btn-like").removeClass("active");
                            b.find(".btn-like").removeClass("disabled");
                            a = b.find(".counter-likes .the-number").html();
                            a = parseInt(a, 10);
                            a--;
                            b.find(".counter-likes .the-number").html(a)
                        }
                    })
                }
                function Kb(d) {
                    var g = {
                        action: "dzsap_front_submitcomment",
                        postdata: d,
                        playerid: D,
                        comm_position: qb,
                        skinwave_comments_process_in_php: a.skinwave_comments_process_in_php,
                        skinwave_comments_avatar: a.skinwave_comments_avatar,
                        skinwave_comments_account: a.skinwave_comments_account
                    };
                    0 < b.find("*[name=comment-email]").length && (g.email = b.find("*[name=comment-email]").eq(0).val());
                    a.settings_php_handler && c.ajax({
                        type: "POST",
                        url: a.settings_php_handler,
                        data: g,
                        success: function(d) {
                            "0" == d.charAt(d.length - 1) && (d = d.slice(0, d.length - 1));
                            d = "";
                            "on" != a.skinwave_comments_process_in_php ? d = g.postdata : (d = '<span class="dzstooltip-con" style="left:' + qb + '"><span class="dzstooltip arrow-from-start transition-slidein arrow-bottom skin-black" style="width: 250px;"><span class="the-comment-author">@' + a.skinwave_comments_account + "</span> says:<br>",
                            d += htmlEncode(g.postdata),
                            d += '</span><div class="the-avatar" style="background-image: url(' + a.skinwave_comments_avatar + ')"></div></span>');
                            C.children().each(function() {
                                var a = c(this);
                                0 == a.hasClass("dzstooltip-con") && a.addClass("dzstooltip-con")
                            });
                            C.append(d);
                            Oc && Oc(b, d)
                        },
                        error: function(a) {
                            C.append(g.postdata)
                        }
                    })
                }
                function Da(d) {
                    var g = {
                        do_not_autoplay: !1,
                        call_from: "default"
                    };
                    d && (g = c.extend(g, d));
                    if ("icecast" == y || "shoutcast" == y)
                        y = "audio";
                    "off" == a.cue && "auto" == ia && (Ua = 1,
                    ia = -1 < String(a.settings_extrahtml).indexOf("{{get_plays}}") ? "on" : "off");
                    if (1 != ab && "youtube" != b.attr("data-original-type")) {
                        if ("youtube" == y && (n(),
                        String(b.attr("data-source")).indexOf("youtube.com/watch"))) {
                            d = b.attr("data-source");
                            var h = String(d).split("youtube.com/watch?v=");
                            h[1] && (d = h[1],
                            -1 < h[1].indexOf("&") && (d = String(h[1]).split("&")[0]),
                            b.attr("data-source", d))
                        }
                        "youtube" == y && ("on" != a.settings_exclude_from_list && dzsap_list && -1 == dzsap_list.indexOf(b) && dzsap_list && "on" != b.attr("data-do-not-include-in-list") && dzsap_list.push(b),
                        dzsap_yt_list.push(b),
                        "change_media" == g.call_from && (Ic = !1,
                        m && m.destroy && (m.destroy(),
                        console.log("DESTROYED LAST PLAYERS")),
                        T.children().remove()),
                        T.append('<div id="' + Mb + '"></div>'),
                        b.get(0).fn_yt_ready = Sa,
                        window.YT && Sa(Mb),
                        b.addClass("media-setuped"),
                        b.addClass("meta-loaded"),
                        q && q.addClass("meta-loaded"));
                        h = d = "";
                        is_ios() && (a.preload_method = "metadata");
                        if ("audio" == y || "normal" == y || "soundcloud" == y)
                            d = d + '<audio preload="' + (a.preload_method + '"'),
                            "on" == a.skinwave_enableSpectrum && (d += ' crossOrigin="anonymous"'),
                            is_ios() && "change_media" == g.call_from && (e += " autoplay"),
                            d += ">",
                            h = "",
                            b.attr("data-source") && ("icecast" != na && (xa = b.attr("data-source")),
                            "fake" != xa ? (h += '<source src="' + xa + '" type="audio/mpeg">',
                            void 0 != b.attr("data-sourceogg") && (h += '<source src="' + b.attr("data-sourceogg") + '" type="audio/ogg">')) : b.addClass("meta-loaded meta-fake")),
                            qc = d + h + "</audio>",
                            "change_media" == g.call_from ? (la && la.pause && la.pause(),
                            T.find(".the-watermark").remove(),
                            la = null,
                            is_ios() || is_android() ? m && (T.children().remove(),
                            c(m).append(h),
                            "change_media" == g.call_from && m.addEventListener("loadedmetadata", function(a) {
                                b.addClass("meta-loaded");
                                b.removeClass("meta-fake");
                                q && q.addClass("meta-loaded")
                            }, !0),
                            m.load && m.load()) : (T.append(qc),
                            m = T.children("audio").get(0))) : (T.children().remove(),
                            T.append(qc),
                            m = T.children("audio").get(0),
                            (is_ios() || is_android()) && "retrieve_soundcloud_url" == g.call_from && setTimeout(function() {
                                Qa()
                            }, 500)),
                            b.attr("data-soft-watermark") && (T.append('<audio class="the-watermark" preload="metadata" loop><source src="' + b.attr("data-soft-watermark") + '" /></audio>'),
                            la = T.find(".the-watermark").get(0),
                            la.volume && (la.volume = xb * a.watermark_volume)),
                            m && m.addEventListener && "fake" != b.attr("data-source") && (Pc = function(d) {
                                console.log("errored out", this, this.audioElement, this.duration, d, d.target.error);
                                if (this.networkState === HTMLMediaElement.NETWORK_NO_SOURCE && 0 == dzsap_is_mobile() && 0 == b.hasClass("errored-out"))
                                    if (console.log("%c could not load audio source - ", "color:#ff2222;", b.attr("data-source")),
                                    5 > ld)
                                        setTimeout(function(a) {
                                            m && (m.src = "");
                                            setTimeout(function() {
                                                m && (m.src = b.attr("data-source"),
                                                m.load())
                                            }, 1E3)
                                        }, 1E3, d),
                                        ld++;
                                    else if ("on" == a.notice_no_media) {
                                        b.addClass("errored-out");
                                        var c = "error - file does not exist...";
                                        d.target.error && (c = d.target.error.message);
                                        b.append('<div class="feedback-text">' + c + " </div>")
                                    }
                            }
                            ,
                            m.addEventListener("error", Pc, !0),
                            m.addEventListener("loadedmetadata", function(a) {
                                b.addClass("meta-loaded");
                                b.removeClass("meta-fake");
                                q && (q.addClass("meta-loaded"),
                                q.removeClass("meta-fake"));
                                "change_media" == g.call_from && 0 == b.hasClass("init-loaded") && Ea({
                                    call_from: "force_reload_change_media"
                                })
                            }, !0));
                        b.addClass("media-setuped");
                        if ("change_media" == g.call_from)
                            return !1;
                        if ("youtube" != y) {
                            "fake" == b.attr("data-source") ? (is_ios() || is_android()) && Ea(g) : is_ios() ? setTimeout(function() {
                                Ea(g)
                            }, 1E3) : Vb = setInterval(function() {
                                var d = g
                                  , h = {
                                    do_not_autoplay: !1
                                };
                                a.fakeplayer && is_ios() || (d && (h = c.extend(h, d)),
                                "youtube" == y ? Ea(h) : "undefined" != typeof m && m && ("AUDIO" != m.nodeName || "shoutcast" == a.type ? Ea(h) : is_safari() ? 1 <= m.readyState && (Ea(h),
                                clearInterval(Vb),
                                a.action_audio_loaded_metadata && a.action_audio_loaded_metadata(b)) : 2 <= m.readyState && (Ea(h),
                                clearInterval(Vb),
                                a.action_audio_loaded_metadata && a.action_audio_loaded_metadata(b))))
                            }, 50);
                            "none" == a.preload_method && setTimeout(function() {
                                m && c(m).attr("preload", "metadata")
                            }, Number(window.dzsap_player_index) + 18E3);
                            if ("skin-customcontrols" == a.design_skin || "skin-customhtml" == a.design_skin)
                                b.find(".custom-play-btn,.custom-pause-btn").off("click"),
                                b.find(".custom-play-btn,.custom-pause-btn").on("click", md);
                            a.failsafe_repair_media_element && (setTimeout(function() {
                                if (T.children().eq(0).get(0) && "AUDIO" == T.children().eq(0).get(0).nodeName)
                                    return !1;
                                T.html("");
                                T.append(qc);
                                var a = ta;
                                Qa();
                                m = T.children("audio").get(0);
                                a && (a = !1,
                                setTimeout(function() {
                                    Y({
                                        call_from: "aux_was_playing"
                                    })
                                }, 20))
                            }, a.failsafe_repair_media_element),
                            a.failsafe_repair_media_element = "")
                        }
                        Qc = !0
                    }
                }
                function La() {
                    m && m.removeEventListener("error", Pc, !0);
                    c(m).remove();
                    m = null;
                    ab = Qc = !1
                }
                function gb() {
                    Qa();
                    m && "audio" == a.type && (m.innerHTML = "",
                    m.load());
                    is_ios() || is_android() || !T || (T.children().remove(),
                    ab = !1);
                    La()
                }
                function Rc() {
                    if (nd)
                        return !1;
                    nd = !0;
                    w.unbind("mousemove");
                    w.unbind("mouseleave");
                    w.unbind("click");
                    w.bind("mousemove", Sc);
                    w.bind("mouseleave", Sc);
                    w.bind("click", Sc);
                    J.on("click", ".volumeicon", Md);
                    J.bind("mousemove", rc);
                    J.bind("mousedown", rc);
                    c(document).on("mouseup", window, rc);
                    if ("skin-silver" == a.design_skin)
                        b.on("click", ".volume-holder", rc);
                    b.find(".playbtn").unbind("click");
                    setTimeout(Pa, 300);
                    setTimeout(Pa, 2E3);
                    0 < a.settings_trigger_resize && setInterval(Pa, a.settings_trigger_resize);
                    b.addClass("listeners-setuped");
                    return !1
                }
                function Nd() {
                    console.log("click_like()");
                    var a = c(this);
                    0 != b.has(a).length && (a.hasClass("active") ? Ub() : jb())
                }
                function Od() {
                    return Gb
                }
                function Ea(d) {
                    b.attr("id");
                    if (!b.hasClass("dzsap-loaded")) {
                        var g = {
                            do_not_autoplay: !1,
                            call_from: "init"
                        };
                        d && (g = c.extend(g, d));
                        setTimeout(function() {
                            od = !0
                        }, 5E3);
                        "undefined" != typeof m && m && "AUDIO" == m.nodeName && m.addEventListener("ended", sc);
                        d = null;
                        b.parent().hasClass("vc_tta-panel-body") ? d = b.parent() : (b.parent().parent().parent().hasClass("vc_tta-panel-body") && (d = b.parent().parent().parent()),
                        b.parent().parent().parent().parent().parent().hasClass("vc_tta-panel-body") && (d = b.parent().parent().parent().parent().parent()));
                        d && (d = d.parent().parent().parent().parent(),
                        d.find(".vc_tta-tab,.vc_tta-panel-heading").data("parent-tabs", d),
                        d.on("click", ".vc_tta-tab,.vc_tta-panel-heading", function() {
                            var a = c(this);
                            a.data("parent-tabs") && a.data("parent-tabs").find(".audioplayer").each(function() {
                                var a = c(this);
                                a.get(0) && a.get(0).api_handleResize && (setTimeout(function(a) {
                                    a.get(0).api_handleResize()
                                }, 10, a),
                                setTimeout(function(a) {
                                    a.get(0).api_pause_media()
                                }, 100, a))
                            })
                        }));
                        clearInterval(Vb);
                        clearTimeout(Vb);
                        Rc();
                        setTimeout(function() {
                            I && 0 < I.outerWidth() && (Tc = I.outerWidth())
                        }, 1E3);
                        hd && (Ob = !0,
                        ua({
                            call_from: "pcm_data_try_to_generate .. no data-pcm"
                        }));
                        "fake" != y && "force_reload_change_media" != g.call_from && ("on" != a.settings_exclude_from_list && dzsap_list && -1 == dzsap_list.indexOf(b) && null == a.fakeplayer && dzsap_list.push(b),
                        "on" == a.type_audio_stop_buffer_on_unfocus && (b.data("type_audio_stop_buffer_on_unfocus", "on"),
                        b.get(0).api_destroy_for_rebuffer = function() {
                            "audio" == a.type && (V = m.currentTime);
                            gb();
                            Uc = !0
                        }
                        ));
                        if ("skin-wave" == a.design_skin && "on" == a.skinwave_enableSpectrum && (null == window.dzsap_audio_ctx ? "undefined" !== typeof AudioContext ? (F = new AudioContext,
                        window.dzsap_audio_ctx = F) : "undefined" !== typeof webkitAudioContext ? (F = new webkitAudioContext,
                        window.dzsap_audio_ctx = F) : F = null : F = window.dzsap_audio_ctx,
                        F))
                            if ("undefined" != typeof F.createJavaScriptNode && (Wb = F.createJavaScriptNode(2048, 1, 1)),
                            "undefined" != typeof F.createScriptProcessor && (Wb = F.createScriptProcessor(4096, 1, 1)),
                            is_android())
                                ra = F.createAnalyser(),
                                ra.smoothingTimeConstant = .3,
                                ra.fftSize = 512,
                                Wb.onaudioprocess = function(a) {
                                    a = new Uint8Array(ra.frequencyBinCount);
                                    ra.getByteFrequencyData(a);
                                    M = a.slice();
                                    ta && (M = Lc())
                                }
                                ,
                                tc = F.createMediaElementSource(m),
                                tc.connect(ra),
                                ra.connect(F.destination),
                                Wb.connect(F.destination);
                            else if (Wb) {
                                ra = F.createAnalyser();
                                ra.smoothingTimeConstant = .3;
                                ra.fftSize = 512;
                                if ("audio" == y) {
                                    m.crossOrigin = "anonymous";
                                    is_ios();
                                    tc = F.createMediaElementSource(m);
                                    tc.connect(ra);
                                    F.createGain && (pd = F.createGain());
                                    ra.connect(F.destination);
                                    pd.connect(F.destination);
                                    var h = F.createBuffer(2, 2 * F.sampleRate, F.sampleRate)
                                }
                                setTimeout(function() {}, 3E3)
                            }
                        "auto" == ia && setTimeout(function() {
                            "auto" == ia && (ia = "off")
                        }, 1E3);
                        ab = !0;
                        "fake" != xa && b.addClass("dzsap-loaded");
                        "default" == a.default_volume && (xb = 1);
                        0 == isNaN(Number(a.default_volume)) ? xb = Number(a.default_volume) : "last" == a.default_volume && (xb = null != localStorage && D ? localStorage.getItem("dzsap_last_volume_" + D) ? localStorage.getItem("dzsap_last_volume_" + D) : 1 : 1);
                        a.volume_from_gallery && (xb = a.volume_from_gallery);
                        db(xb, {
                            call_from: "from_init_loaded"
                        });
                        Z && (V = Z);
                        "number" == typeof V && 0 == Math.round(V) % 1 && oa(V, {
                            call_from: "from_playfrom"
                        });
                        "last" == V && "undefined" != typeof Storage && (setTimeout(function() {
                            Vc = !0
                        }),
                        "undefined" != typeof localStorage["dzsap_" + D + "_lastpos"] && oa(localStorage["dzsap_" + D + "_lastpos"], {
                            call_from: "last_pos"
                        }));
                        1 != g.do_not_autoplay && "on" == a.autoplay && "on" == a.cue && Y({
                            call_from: "do not autoplay not true ( init_loaded() ) "
                        });
                        m && m.duration && b.addClass("meta-loaded");
                        sa({
                            fire_only_once: !1
                        });
                        "off" == a.autoplay && (Ib = !0);
                        b.addClass("init-loaded");
                        setTimeout(function() {
                            uc({
                                call_from: "set timeout 500"
                            });
                            sa({
                                fire_only_once: !0
                            });
                            b.find(".wave-download").bind("click", ub)
                        }, 500);
                        setTimeout(function() {
                            uc({
                                call_from: "set timeout 1000"
                            });
                            h && (B = h.duration);
                            sa({
                                fire_only_once: !0
                            })
                        }, 1E3);
                        setTimeout(function() {}, 2E3);
                        0 == qd && a.action_video_contor_60secs && (qd = setInterval(Pd, 3E4))
                    }
                }
                function Pd() {
                    a.action_video_contor_60secs && b.hasClass("is-playing") && a.action_video_contor_60secs(b, "")
                }
                function Lc() {
                    for (var a = [], b = 0; 256 > b; b++)
                        a[b] = 100 * Math.random();
                    return a
                }
                function Qd(a) {
                    return "undefined" != typeof a && "" != a
                }
                function ub(d) {
                    var g = c(this);
                    if ("click" == d.type) {
                        g.hasClass("wave-download") && wa();
                        g.hasClass("prev-btn") && (console.log("click_prev_btn()"),
                        a.parentgallery && a.parentgallery.get(0) ? a.parentgallery.get(0).api_goto_prev() : rd());
                        g.hasClass("next-btn") && (a.parentgallery && a.parentgallery.get(0) ? a.parentgallery.get(0).api_goto_next() : Wc());
                        g.hasClass("tooltip-indicator--btn-footer-playlist") && g.parent().find(".dzstooltip").toggleClass("active");
                        if (g.hasClass("playlist-menu-item")) {
                            var h = g.parent().children().index(g);
                            console.log("ind - ", h);
                            ba(h, {
                                call_from: "handle_mouse"
                            })
                        }
                        g.hasClass("zoomsounds-btn-go-beginning") && (h = b,
                        a.fakeplayer && (h = a.fakeplayer),
                        h.get(0).api_seek_to_0());
                        g.hasClass("zoomsounds-btn-step-backward") && (h = b,
                        a.fakeplayer && (h = a.fakeplayer),
                        h.get(0).api_step_back());
                        g.hasClass("zoomsounds-btn-step-forward") && (h = b,
                        a.fakeplayer && (h = a.fakeplayer),
                        h.get(0).api_step_forward());
                        g.hasClass("zoomsounds-btn-slow-playback") && (h = b,
                        a.fakeplayer && (h = a.fakeplayer),
                        h.get(0).api_playback_slow());
                        g.hasClass("zoomsounds-btn-reset") && (h = b,
                        a.fakeplayer && (h = a.fakeplayer),
                        h.get(0).api_playback_reset());
                        g.hasClass("btn-zoomsounds-download") && wa();
                        g.hasClass("dzsap-repeat-button") && oa(0, {
                            call_from: "repeat"
                        });
                        g.hasClass("dzsap-loop-button") && (g.hasClass("active") ? (g.removeClass("active"),
                        vc = !1) : (g.addClass("active"),
                        vc = !0),
                        console.log("loop_active - ", vc, b))
                    }
                    "mousedown" == d.type && (console.log("ceva"),
                    g = g.parent(),
                    g.parent().append(g.clone().addClass("cloner")),
                    h = g.parent().children(".cloner").eq(0),
                    dzsap_playlist_con = g.parent(),
                    dzsap_moving_playlist_item = !0,
                    dzsap_playlist_item_target = g,
                    dzsap_playlist_item_moving = h,
                    g.addClass("target-playlist-item"));
                    "mouseenter" == d.type && ("on" == a.preview_on_hover && (Xb(0),
                    Y({
                        call_from: "preview_on_hover"
                    }),
                    console.log("mouseover")),
                    window.dzsap_mouseover = !0);
                    "mouseleave" == d.type && ("on" == a.preview_on_hover && (Xb(0),
                    Qa()),
                    window.dzsap_mouseover = !1)
                }
                function Xc(a) {
                    var d = c(this);
                    if (0 != b.has(d).length) {
                        if ("mouseleave" == a.type) {
                            var h = 100 * Number(b.find(".star-rating-con").eq(0).attr("data-initial-rating-index"));
                            -1 < Ga && 0 < Ga && (h = 100 * Ga / 5);
                            b.find(".rating-prog").css({
                                width: h + "%"
                            })
                        }
                        "mousemove" == a.type && (h = a.pageX - d.offset().left,
                        d.offset(),
                        Va = Math.round(h / (d.outerWidth() / 5)),
                        Va = 4 < Va ? 5 : Math.round(Va),
                        1 > Va && (Va = 1),
                        b.find(".rating-prog").css({
                            width: Va / 5 * 100 + "%"
                        }),
                        Ga = -1,
                        b.find(".star-rating-set-clip").css({
                            opacity: 0
                        }));
                        "click" != a.type || -1 < Ga && 0 < Ga || qa(Va)
                    }
                }
                function Yc() {
                    if ("skin-wave" == a.design_skin) {
                        if ("on" == a.skinwave_enableSpectrum) {
                            if (!ta)
                                return !1;
                            Ca && (Zc = Ca.width(),
                            Yb = Ca.height(),
                            Ca.get(0).width = Zc,
                            Ca.get(0).height = Yb);
                            "soundcloud" == a.type || "on" == Zb ? M = Lc() : (M = new Uint8Array(ra.frequencyBinCount),
                            ra.getByteFrequencyData(M));
                            if ($c) {
                                if (0 == M[0] && 0 == M[Math.round(M.length / 4)] && 0 == M[Math.round(M.length / 2)] && 0 == M[Math.round(M.length / 3 / 4)])
                                    "auto" == Zb && (Zb = "on",
                                    sd = "lastarray0");
                                else if ("auto" == Zb || "lastarray0" == sd)
                                    Zb = "off";
                                $c = !1
                            }
                            if (M && M.length) {
                                for (var d = M.length, c = d - 1; 0 <= c; c--)
                                    M[c] = c < d / 2 ? M[c] / 255 * Yb : M[d - c] / 255 * Yb;
                                if (wc)
                                    for (d = 0; d < wc.length; d++)
                                        ad = wc[d],
                                        td = M[d] - ad,
                                        ud = 3,
                                        M[d] = Math.easeIn(1, ad, td, ud);
                                Ha(Ca.get(0), M, "" + a.design_wave_color_bg, {
                                    call_from: "spectrum"
                                });
                                M && (wc = M.slice())
                            }
                        }
                        if (I && I.length && "on" != a.skinwave_timer_static) {
                            0 > K && (K = 0);
                            K = parseInt(K, 10);
                            if (2 > K && b.data("promise-to-play-footer-player-from"))
                                return !1;
                            I.css({
                                left: K
                            });
                            K > G - Tc && I.css({
                                left: G - Tc
                            });
                            K > G - 30 && G ? N.css({
                                opacity: 1 - (K - (G - 30)) / 30
                            }) : "1" != N.css("opacity") && N.css({
                                opacity: ""
                            })
                        }
                    }
                    I && (0 == bd && I.html(vb(ha)),
                    U && -1 < U && (b.addClass("time-total-visible"),
                    0 == vd && (a.action_received_time_total && a.action_received_time_total(U, b),
                    vd = !0)),
                    U != wd && (N.html(vb(U)),
                    N.fadeIn("fast")))
                }
                function $b() {
                    0 == B && (B = U);
                    K = H / B * G;
                    a.fakeplayer && 0 < ha && 0 < U && (K = ha / U * G);
                    isNaN(K) && (K = 0);
                    K > G && (K = G);
                    -1 == H && (K = 0);
                    0 == B || "-1" == B || isNaN(B);
                    if (2 > K && b.data("promise-to-play-footer-player-from"))
                        return !1;
                    Mc && (Mc.style.width = parseInt(K, 10) + "px")
                }
                function uc(b) {
                    var d = {
                        call_from: "default"
                    };
                    b && c.extend(d, b);
                    ("audio" == y || "fake" == y && a.fakeplayer) && "shoutcast" != a.type && (m && (pb = m.duration,
                    null == a.fakeplayer && (Wa = m.currentTime)),
                    a.fakeplayer && (H = ha),
                    F && is_firefox(),
                    "last" == V && Vc && "undefined" != typeof Storage && (localStorage["dzsap_" + D + "_lastpos"] = H))
                }
                function xd(a) {
                    a = String(a).replace("%3A", ":");
                    if ((a = String(a).replace("#", "")) && -1 < String(a).indexOf(":")) {
                        var b = /(\d.*):(\d.*)/g.exec(a);
                        a = parseInt(b[1], 10);
                        b = parseInt(b[2], 10);
                        return 60 * a + b
                    }
                    return Number(a)
                }
                function sa(d) {
                    var g = {
                        fire_only_once: !1
                    };
                    d && (g = c.extend(g, d));
                    if (Hb)
                        return console.warn("DESTROYED"),
                        !1;
                    if (0 == g.fire_only_once && Ib)
                        return requestAnimFrame(sa),
                        !1;
                    Wa = pb = -1;
                    if ("youtube" == y)
                        try {
                            m && m.getDuration && (pb = m.getDuration(),
                            null == a.fakeplayer && (Wa = m.getCurrentTime())),
                            "last" == V && Vc && "undefined" != typeof Storage && (localStorage["dzsap_" + D + "_lastpos"] = Wa)
                        } catch (Ld) {
                            console.log("yt error - ", Ld)
                        }
                    uc({
                        call_from: "checK_time"
                    });
                    -1 < Wa && (ha = H = Wa);
                    -1 < pb && (U = B = pb);
                    if ("skin-wave" == a.design_skin && "on" == a.skinwave_comments_displayontime) {
                        var h = Math.round(gd / Dc * 100) / 100;
                        "fake" == y && (h = Math.round(H / B * 100) / 100);
                        C && C.children().each(function() {
                            var a = c(this);
                            if (a.hasClass("dzstooltip-con")) {
                                var d = a.offset().left - C.offset().left;
                                d = Math.round(parseFloat(d) / C.outerWidth() * 100) / 100;
                                b.attr("id");
                                d && (.02 > Math.abs(d - h) ? (C.find(".dzstooltip").removeClass("active"),
                                a.find(".dzstooltip").addClass("active")) : a.find(".dzstooltip").removeClass("active"))
                            }
                        })
                    }
                    Z && (ha < Z && (ha = Z),
                    Xa && H > Xa && (d = {
                        call_from: "time_curr>pseudo_sample_time_end"
                    },
                    sc(d),
                    kb = !0,
                    clearTimeout(ac),
                    ac = setTimeout(function() {
                        kb = !1
                    }, 1E3)));
                    null == a.fakeplayer && 0 == Z && 0 < aa && (ha = aa + Wa);
                    0 < ma && (U = ma);
                    $b();
                    q && (q.get(0) && q.get(0).api_get_time_curr && ((isNaN(q.get(0).api_get_time_total()) || "" == q.get(0).api_get_time_total() || 1 > q.get(0).api_get_time_total()) && q.get(0).api_set_time_total(U),
                    q.get(0).api_set_time_curr(H)),
                    q.get(0) && q.get(0).api_seek_to_visual ? (d = H,
                    0 == Z && aa && (d -= aa),
                    q.get(0).api_seek_to_visual(d / B)) : console.log("warning .. no seek to visual"));
                    if ("skin-minimal" == a.design_skin)
                        if (yd)
                            if (ta || 0 == Nc) {
                                if (Fa) {
                                    d = Fa.getContext("2d");
                                    var e = Fa.width
                                      , f = Fa.height
                                      , k = e / 100
                                      , l = f / 100;
                                    K = H / B * Math.PI * 2;
                                    isNaN(K) && (K = 0);
                                    K > 2 * Math.PI && (K = 2 * Math.PI);
                                    d.clearRect(0, 0, e, f);
                                    d.beginPath();
                                    d.arc(50 * k, 50 * l, 40 * k, 0, 2 * Math.PI, !1);
                                    d.fillStyle = "rgba(0,0,0,0.1)";
                                    d.fill();
                                    d.beginPath();
                                    d.arc(50 * k, 50 * l, 34 * k, 0, K, !1);
                                    d.lineWidth = 10 * k;
                                    d.strokeStyle = "rgba(0,0,0,0.3)";
                                    d.stroke();
                                    Nc = !0
                                }
                            } else
                                return 1 != g.fire_only_once && requestAnimFrame(sa),
                                !1;
                        else
                            P.addClass("canvas-fallback");
                    Yc();
                    od && 1 < B && H >= B - .07 && (d = {
                        call_from: "time_total > 0 && time_curr >= time_total - 0.07 ... "
                    },
                    a.fakeplayer || (sc(d),
                    kb = !0,
                    clearTimeout(ac),
                    ac = setTimeout(function() {
                        kb = !1
                    }, 1E3)));
                    1 != g.fire_only_once && requestAnimFrame(sa);
                    wd = U;
                    F && N && N.html(vb(U))
                }
                function md(d) {
                    b.hasClass("prevent-bubble") && d && d.stopPropagation && (d.preventDefault(),
                    d.stopPropagation());
                    var g = c(this)
                      , h = !1;
                    if (!b.hasClass("listeners-setuped")) {
                        c(m).attr("preload", "auto");
                        Rc();
                        Ea();
                        var e = setInterval(function() {
                            m && m.duration && 0 == isNaN(m.duration) && (B = Dc = m.duration,
                            b.addClass("meta-loaded"),
                            N && N.html(vb(U)),
                            clearInterval(e))
                        }, 1E3)
                    }
                    if ("skin-minimal" == a.design_skin) {
                        var f = g.offset().left + Ma / 2;
                        g = g.offset().top + Ma / 2;
                        var k = d.pageX;
                        d = d.pageY;
                        var l = .005 * -(k - f - Ma / 2);
                        d < g && (l = .5 + (.5 - l));
                        if (20 < Math.abs(d - g) || 20 < Math.abs(k - f))
                            Xb(l, {
                                call_from: "skin_minimal_scrub"
                            }),
                            h = !0,
                            sa({
                                fire_only_once: !0
                            })
                    }
                    0 == h && (0 == ta ? Y({
                        call_from: "click_playpause"
                    }) : Qa());
                    return !1
                }
                function rd() {
                    if (a.fakeplayer)
                        return a.fakeplayer.get(0).api_sync_players_goto_prev(),
                        !1;
                    if (ea && ea.children(".dzstooltip--inner").length) {
                        var d = ic - 1;
                        0 <= d && ba(d, {
                            call_from: "api_sync_players_prev"
                        })
                    } else if (0 < dzsap_list_for_sync_players.length)
                        for (d in dzsap_list_for_sync_players) {
                            var c = b;
                            q && (c = q);
                            if (dzsap_list_for_sync_players[d].get(0) == c.get(0) && (d = parseInt(d, 10),
                            0 < d)) {
                                var h = dzsap_list_for_sync_players[d - 1].get(0);
                                h && h.api_play_media && setTimeout(function() {
                                    h.api_play_media({
                                        call_from: "api_sync_players_prev"
                                    })
                                }, 200)
                            }
                        }
                }
                function Wc() {
                    if (a.fakeplayer)
                        return a.fakeplayer.get(0).api_sync_players_goto_next(),
                        !1;
                    if (ea && ea.find(".playlist-menu-item").length) {
                        var d = ic + 1;
                        d - 1 > ea.find(".playlist-menu-item").length || ba(d, {
                            call_from: "api_sync_players_prev"
                        })
                    } else if (d = null,
                    0 < dzsap_list_for_sync_players.length)
                        for (var c in dzsap_list_for_sync_players)
                            if (d = b,
                            q && (d = q),
                            dzsap_list_for_sync_players[c].get(0) == d.get(0) && (c = parseInt(c, 10),
                            d = c + 1,
                            d < dzsap_list_for_sync_players.length)) {
                                var h = dzsap_list_for_sync_players[d].get(0);
                                h && h && h.api_play_media && setTimeout(function() {
                                    h.api_play_media({
                                        call_from: "api_sync_players_prev"
                                    })
                                }, 200)
                            }
                }
                function sc(d) {
                    var g = {
                        call_from: "default"
                    };
                    d && (g = c.extend(g, d));
                    if (kb)
                        return !1;
                    kb = !0;
                    ac = setTimeout(function() {
                        kb = !1
                    }, 1E3);
                    if (a.fakeplayer && "fake_player" != g.call_from)
                        return !1;
                    oa(0, {
                        call_from: "handle_end"
                    });
                    if ("on" == a.loop || vc)
                        return Y({
                            call_from: "track_end"
                        }),
                        !1;
                    Qa();
                    a.parentgallery && "undefined" != typeof a.parentgallery && a.parentgallery.get(0).api_gallery_handle_end();
                    setTimeout(function() {
                        b.hasClass("is-single-player") && Wc()
                    }, 100);
                    setTimeout(function() {
                        if (q && (q.hasClass("is-single-player") || q.hasClass("feeded-whole-playlist")))
                            return q.get(0).api_handle_end({
                                call_from: "handle_end fake_player"
                            }),
                            !1;
                        xc && xc(b, {})
                    }, 200)
                }
                function Pa(d, g) {
                    d = {
                        call_from: "default"
                    };
                    g && c.extend(d, g);
                    c(window).width();
                    pa = b.width();
                    b.height();
                    Ca && "function" == typeof Ca.width && (Zc = Ca.width(),
                    Yb = Ca.height());
                    720 >= pa ? b.addClass("under-720") : b.removeClass("under-720");
                    500 >= pa ? (0 == b.hasClass("under-500") && "skin-wave" == a.design_skin && "normal" == L && ca.append(A),
                    b.addClass("under-500")) : (0 == b.hasClass("under-500") && "skin-wave" == a.design_skin && "normal" == L && Rb.after(A),
                    b.removeClass("under-500"));
                    G = pa;
                    "skin-default" == a.design_skin && (G = pa);
                    "skin-pro" == a.design_skin && (G = pa);
                    if ("skin-silver" == a.design_skin || "skin-aria" == a.design_skin)
                        G = pa,
                        G = w.width();
                    "skin-justthumbandbutton" == a.design_skin && (G = pa = b.children(".audioplayer-inner").outerWidth());
                    if ("skin-redlights" == a.design_skin || "skin-steel" == a.design_skin)
                        G = w.width();
                    "skin-wave" == a.design_skin && (G = w.outerWidth(!1),
                    w.outerHeight(!1),
                    C && (g = 0,
                    w && b && w.offset() ? g = w.offset().left - b.offset().left : console.log("no scrubbar or cthis", w, b),
                    C.css({
                        width: G
                    }),
                    b.hasClass("skin-wave-mode-small") && C.css({
                        left: g + "px"
                    }),
                    C.addClass("active")));
                    1 == zd && ("skin-default" == a.design_skin && (void 0 != b.get(0) && "auto" == b.get(0).style.height && b.height(200),
                    O.height(),
                    "undefined" == typeof b.attr("data-initheight") && "" != b.attr("data-initheight") ? b.attr("data-initheight", O.height()) : b.attr("data-initheight")),
                    O.find(".the-thumb").eq(0).css({}));
                    "none" != b.css("display") && (w.find(".scrub-bg-img").eq(0).css({}),
                    w.find(".scrub-prog-img").eq(0).css({
                        width: w.children(".scrub-bg").width()
                    }),
                    w.find(".scrub-prog-canvas").eq(0).css({
                        width: w.children(".scrub-bg").width()
                    }),
                    w.find(".scrub-prog-img-reflect").eq(0).css({
                        width: w.children(".scrub-bg").width()
                    }),
                    w.find(".scrub-prog-canvas-reflect").eq(0).css({
                        width: w.children(".scrub-bg").width()
                    }));
                    b.removeClass("under-240 under-400");
                    240 >= pa && b.addClass("under-240");
                    500 >= pa ? (b.addClass("under-400"),
                    0 == yb && (yb = !0,
                    Ad())) : 1 == yb && (yb = !1,
                    Ad());
                    if ("skin-wave" == a.design_skin) {
                        lb = 0;
                        0 < b.find(".the-thumb").length && (lb += b.find(".the-thumb").width() + 20);
                        lb += 70;
                        w.eq(0).height();
                        "small" == L && (lb -= 80,
                        lb += 13,
                        P.css({}),
                        lb += P.outerWidth() + 10);
                        if (A && "none" != A.css("display")) {
                            if ("skin-wave" != a.design_skin || "small" != L)
                                A.css({}),
                                "skin-wave" == a.design_skin && "small" != L && A.css({});
                            lb += A.outerWidth()
                        }
                        J && J.css("display");
                        "small" == L && (w.css({}),
                        G = w.width(),
                        w.find(".scrub-bg--img").eq(0).css({
                            width: G
                        }),
                        w.find(".scrub-prog--img").eq(0).css({
                            width: G
                        }));
                        "canvas" == a.skinwave_wave_mode && b.attr("data-pcm") && (100 == Za.width() && Za.width(w.width()),
                        Za && id && ca.parent(),
                        "fake" != xa && (bc ? (clearTimeout(bc),
                        bc = setTimeout(Bd, 500)) : (Bd(),
                        bc = 1)))
                    }
                    "skin-minimal" == a.design_skin && (Ma = ca.width(),
                    Fa && (Fa.style.width = Ma,
                    Fa.width = Ma,
                    Fa.style.height = Ma,
                    Fa.height = Ma,
                    c(Fa).css({
                        width: Ma,
                        height: Ma
                    })));
                    "skin-default" == a.design_skin && I && (g = parseInt(A.css("left"), 10),
                    A.outerWidth(),
                    A.css("display"),
                    isNaN(g));
                    "skin-minion" == a.design_skin && (g = parseInt(Ka.find(".con-playpause").eq(0).offset().left, 10) - parseInt(Ka.eq(0).offset().left, 10) - 18,
                    Ka.find(".prev-btn").eq(0).css({
                        top: 0,
                        left: g
                    }),
                    g += 36,
                    Ka.find(".next-btn").eq(0).css({
                        top: 0,
                        left: g
                    }));
                    "on" == a.embedded && window.frameElement && (g = {
                        height: b.outerHeight()
                    },
                    a.embedded_iframe_id && (g.embedded_iframe_id = a.embedded_iframe_id),
                    window.parent.postMessage({
                        name: "resizeIframe",
                        params: g
                    }, "*"));
                    $b();
                    0 < a.settings_trigger_resize && a.parentgallery && void 0 != c(a.parentgallery).get(0) && void 0 != c(a.parentgallery).get(0).api_handleResize && c(a.parentgallery).get(0).api_handleResize()
                }
                function Ad() {
                    a.restyle_player_over_400 && a.restyle_player_under_400 && (yb ? (console.log("RESTYLING WITH CLASS -> ", a.restyle_player_under_400),
                    b.removeClass(a.restyle_player_over_400),
                    b.addClass(a.restyle_player_under_400)) : (console.log("RESTYLING WITH CLASS -> ", a.restyle_player_over_400),
                    b.removeClass(a.restyle_player_under_400),
                    b.addClass(a.restyle_player_over_400)),
                    r(),
                    tb(),
                    O.append(b.find(".meta-artist-con")),
                    b.find(".ap-controls").remove(),
                    O.children(".the-thumb-con").remove(),
                    yb ? (console.log("RESTYLING WITH CLASS -> ", a.restyle_player_under_400),
                    b.removeClass(a.restyle_player_over_400),
                    b.addClass(a.restyle_player_under_400)) : (b.css({
                        "padding-top": ""
                    }),
                    console.log("RESTYLING WITH CLASS -> ", a.restyle_player_over_400),
                    b.removeClass(a.restyle_player_under_400),
                    b.addClass(a.restyle_player_over_400)),
                    S({
                        setup_inner_player: !1,
                        setup_media: !1,
                        setup_otherstructure: !0,
                        call_from: "reconstruct"
                    }),
                    Rc())
                }
                function Bd() {
                    Ha(Za.get(0), b.attr("data-pcm"), "#" + a.design_wave_color_bg, {
                        call_from: "canvas_normal_pcm_bg"
                    });
                    Ha($a.get(0), b.attr("data-pcm"), "#" + a.design_wave_color_progress, {
                        call_from: "canvas_normal_pcm_prog"
                    });
                    bc = 0
                }
                function rc(d) {
                    var g = c(this);
                    "mousemove" == d.type && cd && (e = (d.pageX - J.find(".volume_static").eq(0).offset().left) / J.find(".volume_static").eq(0).width(),
                    g.parent().hasClass("volume-holder") || g.hasClass("volume-holder"),
                    "skin-redlights" == a.design_skin && (e *= 10,
                    e = Math.round(e),
                    e /= 10),
                    db(e, {
                        call_from: "set_by_mousemove"
                    }),
                    zb = !1);
                    "click" == d.type && (e = (d.pageX - J.find(".volume_static").eq(0).offset().left) / J.find(".volume_static").eq(0).width(),
                    g.parent().hasClass("volume-holder") && (e = 1 - (d.pageY - J.find(".volume_static").eq(0).offset().top) / J.find(".volume_static").eq(0).height()),
                    g.hasClass("volume-holder") && (e = 1 - (d.pageY - J.find(".volume_static").eq(0).offset().top) / J.find(".volume_static").eq(0).height(),
                    console.log(e)),
                    db(e, {
                        call_from: "set_by_mouseclick"
                    }),
                    zb = !1);
                    "mousedown" == d.type && (cd = !0,
                    b.addClass("volume-dragging"),
                    e = (d.pageX - J.find(".volume_static").eq(0).offset().left) / J.find(".volume_static").eq(0).width(),
                    g.parent().hasClass("volume-holder") && (e = 1 - (d.pageY - J.find(".volume_static").eq(0).offset().top) / J.find(".volume_static").eq(0).height()),
                    db(e, {
                        call_from: "set_by_mousedown"
                    }),
                    zb = !1);
                    "mouseup" == d.type && (cd = !1,
                    b.removeClass("volume-dragging"))
                }
                function Sc(d) {
                    var g = d.pageX;
                    if (c(d.target).hasClass("sample-block-start") || c(d.target).hasClass("sample-block-end"))
                        return !1;
                    if ("mousemove" == d.type && (w.children(".scrubBox-hover").css({
                        left: g - w.offset().left
                    }),
                    "on" == a.scrub_show_scrub_time && B)) {
                        var h = (g - w.offset().left) / w.outerWidth() * B;
                        I && (I.html(vb(h)),
                        I.addClass("scrub-time"));
                        bd = !0
                    }
                    "mouseleave" == d.type && (bd = !1,
                    I && I.removeClass("scrub-time"),
                    Yc());
                    if ("click" == d.type && (b.hasClass("prevent-bubble") && d && d.stopPropagation && (d.preventDefault(),
                    d.stopPropagation()),
                    0 == G && (G = w.width()),
                    0 == G && (G = 300),
                    h = (d.pageX - w.offset().left) / G * B,
                    0 == Z && 0 < aa && (h -= aa),
                    a.fakeplayer && setTimeout(function() {
                        a.fakeplayer.get(0) && a.fakeplayer.get(0).api_pause_media && a.fakeplayer.get(0).api_seek_to_perc(h / B, {
                            call_from: "from_feeder_to_feed"
                        })
                    }, 50),
                    oa(h, {
                        call_from: "handle_mouse_scrubbar"
                    }),
                    "on" == a.autoplay_on_scrub_click && 0 == ta && Y({
                        call_from: "handle_mouse_scrubbar"
                    }),
                    b.hasClass("from-wc_loop")))
                        return !1
                }
                function Xb(b, c) {
                    a.fakeplayer && (B = U);
                    oa(b * B, c)
                }
                function oa(d, g) {
                    var h = {
                        call_from: "default",
                        deeplinking: "off",
                        call_from_type: "default"
                    };
                    g && (h = c.extend(h, g));
                    0 == d && (H = 0);
                    dd && (dd = !1);
                    "on" == h.deeplinking && (g = add_query_arg(window.location.href, "audio_time", d),
                    history.pushState({
                        foo: "bar"
                    }, null, g));
                    d = xd(d);
                    Z && (d < Z && (d = Z),
                    d > Xa && (d = Xa));
                    if (a.fakeplayer)
                        return g = {
                            type: cc,
                            fakeplayer_is_feeder: "on"
                        },
                        a.fakeplayer.length && a.fakeplayer.data("feeding-from") != b.get(0) && ("handle_end" != h.call_from && "from_playfrom" != h.call_from && "last_pos" != h.call_from ? (g.call_from = "seek_to from player source->" + b.attr("data-source") + " < -  old call from - " + h.call_from,
                        a.fakeplayer.get(0).api_change_media(b, g)) : (Wa = ha = H = d,
                        b.data("promise-to-play-footer-player-from", d))),
                        setTimeout(function() {
                            a.fakeplayer.get(0) && a.fakeplayer.get(0).api_pause_media && "from_playfrom" != h.call_from && "last_pos" != h.call_from && a.fakeplayer.get(0).api_seek_to(d, {
                                call_from: "from_feeder_to_feed"
                            })
                        }, 50),
                        !1;
                    if ("youtube" == y)
                        try {
                            m.seekTo(d)
                        } catch (Oa) {
                            console.log("yt seek err - ", Oa)
                        }
                    sa({
                        fire_only_once: !0
                    });
                    setTimeout(function() {
                        sa({
                            fire_only_once: !0
                        })
                    }, 20);
                    if ("audio" == y) {
                        if (m && "undefined" != typeof m.currentTime)
                            try {
                                m.currentTime = d
                            } catch (Oa) {
                                console.log("error on scrub", Oa, " arg - ", d)
                            }
                        return !1
                    }
                }
                function Rd(b) {
                    0 == B && m && m.duration && (B = m.duration);
                    a.fakeplayer && (H = ha,
                    B = U);
                    H = b * B;
                    sa({
                        fire_only_once: !0
                    });
                    setTimeout(function() {
                        sa({
                            fire_only_once: !0
                        })
                    }, 20)
                }
                function Sd(a) {
                    "youtube" == y && m.setPlaybackRate(a);
                    "audio" == y && (m.playbackRate = a)
                }
                function db(d, g) {
                    var h = {
                        call_from: "default"
                    };
                    g && (h = c.extend(h, g));
                    1 < d && (d = 1);
                    0 > d && (d = 0);
                    if ("from_fake_player_feeder_from_init_loaded" == h.call_from && q) {
                        "default" != a.default_volume && (yc = !0);
                        if (yc)
                            return !1;
                        yc = !0;
                        console.log("SET VOLUME BY USER", b)
                    }
                    if ("set_by_mouseclick" == h.call_from || "set_by_mousemove" == h.call_from)
                        yc = !0;
                    "youtube" == y && m && m.setVolume && m.setVolume(100 * d);
                    "audio" == y && (m ? (m.volume = d,
                    la && (la.volume = d * a.watermark_volume)) : m && c(m).attr("preload", "metadata"));
                    Cd(d, h);
                    q && (h.call_from = "from_fake_player",
                    q.get(0) && q.get(0).api_visual_set_volume(d, h) && q.get(0).api_visual_set_volume(d, h));
                    a.fakeplayer && "from_fake_player" != h.call_from && (h.call_from = "from_init_loaded" == h.call_from ? "from_fake_player_feeder_from_init_loaded" : "from_fake_player_feeder",
                    q && q.get(0) && q.get(0).api_set_volume(d, h) && a.fakeplayer.get(0).api_set_volume(d, h))
                }
                function Cd(d, c) {
                    J.hasClass("controls-volume-vertical") ? J.find(".volume_active").eq(0).css({
                        height: J.find(".volume_static").eq(0).height() * d
                    }) : J.find(".volume_active").eq(0).css({
                        width: J.find(".volume_static").eq(0).width() * d
                    });
                    "skin-wave" == a.design_skin && "on" == a.skinwave_dynamicwaves && (w.find(".scrub-bg-img").eq(0).css({
                        transform: "scaleY(" + d + ")"
                    }),
                    w.find(".scrub-prog-img").eq(0).css({
                        transform: "scaleY(" + d + ")"
                    }),
                    "on" == a.skinwave_enableReflect && (0 == d ? b.find(".scrub-bg-img-reflect").fadeOut("slow") : b.find(".scrub-bg-img-reflect").fadeIn("slow")));
                    null != localStorage && D && localStorage.setItem("dzsap_last_volume_" + D, d);
                    Gb = d
                }
                function Md(a) {
                    0 == zb ? (Dd = Gb,
                    db(0, {
                        call_from: "from_mute"
                    }),
                    zb = !0) : (db(Dd, {
                        call_from: "from_unmute"
                    }),
                    zb = !1)
                }
                function Ed(d) {
                    var g = {
                        call_from: "default"
                    };
                    d && c.extend(g, d);
                    "on" != a.design_animateplaypause && (P.children(".playbtn").css({
                        display: "block"
                    }),
                    P.children(".pausebtn").css({
                        display: "none"
                    }));
                    P.removeClass("playing");
                    b.removeClass("is-playing");
                    ta = !1;
                    b.parent().hasClass("zoomsounds-wrapper-bg-center") && b.parent().removeClass("is-playing");
                    a.parentgallery && a.parentgallery.removeClass("player-is-playing");
                    Ib = !0;
                    zc && zc(b)
                }
                function Qa(d) {
                    var g = {
                        audioapi_setlasttime: !0,
                        donot_change_media: !1
                    };
                    if (Hb)
                        return !1;
                    d && (g = c.extend(g, d));
                    Ed({
                        call_from: "pause_media"
                    });
                    1 != g.donot_change_media && null != a.fakeplayer ? (d = {
                        type: cc,
                        fakeplayer_is_feeder: "on"
                    },
                    a.fakeplayer && a.fakeplayer.length && a.fakeplayer.data("feeding-from") != b.get(0) && (d.call_from = "pause_media from player " + b.attr("data-source"),
                    a.fakeplayer.get(0).api_change_media(b, d)),
                    setTimeout(function() {
                        a.fakeplayer.get(0) && a.fakeplayer.get(0).api_pause_media && a.fakeplayer.get(0).api_pause_media()
                    }, 100)) : ("youtube" == y && m && m.pauseVideo && m.pauseVideo(),
                    "audio" == y && (m && ("stop" == a.pause_method ? (m.pause(),
                    m.src = "",
                    La(),
                    c(m).remove(),
                    m = null) : m.pause && m.pause()),
                    la && la.pause && la.pause()),
                    q && q.get(0).api_pause_media_visual({
                        call_from: "pause_media in child player"
                    }));
                    ta = !1;
                    b.removeClass("is-playing");
                    b.parent().hasClass("zoomsounds-wrapper-bg-center") && b.parent().removeClass("is-playing")
                }
                function Ec(d) {
                    "on" != a.design_animateplaypause && (P.children(".playbtn").css({
                        display: "none"
                    }),
                    P.children(".pausebtn").css({
                        display: "block"
                    }));
                    ta = !0;
                    Ib = !1;
                    b.addClass("is-playing");
                    b.addClass("first-played");
                    P.addClass("playing");
                    b.parent().hasClass("zoomsounds-wrapper-bg-center") && b.parent().addClass("is-playing");
                    a.parentgallery && a.parentgallery.addClass("player-is-playing");
                    ja && ja.addClass("audioplayer-loaded");
                    Ac && Ac(b);
                    ed && ed(b)
                }
                function Y(d) {
                    var g = {
                        api_report_play_media: !0,
                        call_from: "default",
                        retry_call: 0
                    };
                    d && (g = c.extend(g, d));
                    Qc || Da();
                    "api_sync_players_prev" == g.call_from && (Fd = b.parent().children(".audioplayer,.audioplayer-tobe").index(b),
                    a.parentgallery && a.parentgallery.get(0) && a.parentgallery.get(0).api_goto_item && a.parentgallery.get(0).api_goto_item(Fd));
                    is_ios();
                    0 == b.hasClass("media-setuped") && null == a.fakeplayer && console.log("warning: media not setuped, there might be issues", b.attr("id"));
                    if ("feed_to_feeder" == g.call_from && 0 == b.hasClass("dzsap-loaded") && (Ea(),
                    d = 300,
                    is_ios(),
                    is_android_good() && (d = 0),
                    "with delay" != g.call_from_aux))
                        return d ? setTimeout(function() {
                            g.call_from_aux = "with delay";
                            Y(g)
                        }, d) : Y(g),
                        !1;
                    for (Na = 0; Na < dzsap_list.length; Na++)
                        dzsap_list[Na].get(0) && dzsap_list[Na].get(0).api_pause_media && dzsap_list[Na].get(0) != b.get(0) && (dzsap_list[Na].data("type_audio_stop_buffer_on_unfocus") && "on" == dzsap_list[Na].data("type_audio_stop_buffer_on_unfocus") ? dzsap_list[Na].get(0).api_destroy_for_rebuffer() : dzsap_list[Na].get(0).api_pause_media({
                            audioapi_setlasttime: !1
                        }));
                    Uc && (Da(),
                    "number" == typeof V && 0 == Math.round(V) % 1 && oa(V, {
                        call_from: "destroyed_for_rebuffer_playfrom"
                    }),
                    Uc = !1);
                    "on" == a.google_analytics_send_play_event && window._gaq && 0 == Bc && (window._gaq.push(["_trackEvent", "ZoomSounds Play", "Play", "zoomsounds play - " + Ya]),
                    Bc = !0);
                    !window.ga && window.__gaTracker && (window.ga = window.__gaTracker);
                    "on" == a.google_analytics_send_play_event && window.ga && 0 == Bc && (window.console && console.log("sent event"),
                    Bc = !0,
                    window.ga("send", {
                        hitType: "event",
                        eventCategory: "zoomsounds play - " + Ya,
                        eventAction: "play",
                        eventLabel: "zoomsounds play - " + Ya
                    }));
                    q && q.get(0).api_play_media_visual({
                        api_report_play_media: !1
                    });
                    if (a.fakeplayer) {
                        d = {
                            type: cc,
                            fakeplayer_is_feeder: "on",
                            call_from: "play_media_audioplayer"
                        };
                        try {
                            "click_playpause" == g.call_from && a.parentgallery && (a.parentgallery.get(0).api_regenerate_sync_players_with_this_playlist(),
                            a.fakeplayer.get(0).api_regenerate_playerlist_inner());
                            a.fakeplayer && a.fakeplayer.length && a.fakeplayer.data("feeding-from") != b.get(0) && (d.call_from = "play_media from player " + b.attr("data-source") + " < -  old call from - " + g.call_from,
                            a.fakeplayer.get(0).api_change_media(b, d),
                            0 == b.hasClass("first-played") && b.data("promise-to-play-footer-player-from") && (oa(b.data("promise-to-play-footer-player-from")),
                            setTimeout(function() {
                                b.data("promise-to-play-footer-player-from", "")
                            }, 1E3)));
                            setTimeout(function() {
                                a.fakeplayer.get(0) && a.fakeplayer.get(0).api_play_media && a.fakeplayer.get(0).api_play_media({
                                    call_from: "feed_to_feeder"
                                })
                            }, 100);
                            "off" == ia && ib();
                            return
                        } catch (h) {
                            console.log("no fake player..", h)
                        }
                    }
                    if ("youtube" == y)
                        try {
                            m && m.playVideo ? m.playVideo() : 5 > g.retry_call && (g.retry_call++,
                            g.call_from = "retry for youtube",
                            0 == Ic ? (ab = !1,
                            Sa(Mb),
                            Jc = setTimeout(function(a) {
                                Y(a)
                            }, 500, g)) : Jc = setTimeout(function(a) {
                                Y(a)
                            }, 500, g))
                        } catch (h) {
                            console.log(h)
                        }
                    if ("normal" == y || "detect" == y)
                        y = "audio";
                    "audio" != y || b.attr("data-original-type") || (m ? m.play ? m.play() : null == a.fakeplayer && (rb = !0) : null == a.fakeplayer && (rb = !0),
                    la && la.play && la.play());
                    Ec(g);
                    q ? (dzsap_currplayer_focused = q.get(0),
                    q.get(0).api_try_to_submit_view()) : (dzsap_currplayer_focused = b.get(0),
                    Gd());
                    "on" == Ja.play_trigger_step_back && dzsap_currplayer_focused && dzsap_currplayer_focused.api_step_back(Ja.step_back_amount)
                }
                function Gd() {
                    "auto" == ia && (ia = "off");
                    "off" == ia && ib()
                }
                function vb(a) {
                    a = Math.round(a);
                    var b = 0;
                    if (0 < a) {
                        for (; 59 < a && 3E6 > a && isFinite(a); )
                            b++,
                            a -= 60;
                        return String((10 > b ? "0" : "") + b + ":" + (10 > a ? "0" : "") + a)
                    }
                    return "00:00"
                }
                var b = c(this);
                b.children();
                var Hd = "ap1", Id = "", Na = 0, pa, G = 0, K = 0, O, ca = null, Aa = null, E = null, Ka, P = null, Rb = null, J, w, Za, Mc, $a, T, m = null, la = null, Ra = null, id, A, ea = null, Ca = null, C = null, X = null, I = null, N = null, q = null, ya = null, ta = !1, zb = !1, ab = !1, Ic = !1, Hb = !1, Bc = !1, Uc = !1, vc = !1, ec = !1, wb = !1, yd = !1, bd = !1, nd = !1, Qc = !1, od = !1, B = 0, wd = 0, ha = -1, Wa = -1, U = -1, pb = -1, H = 0, gd = 0, Dc = 0, aa = 0, eb = 0, Z = 0, Xa = 0, ma = 0, Cc = 0, ic = 0, dc = 0, ld = 0, Tc = 0, Kd = 0, Fd = -1, fa = 0, Gb = 1, Dd = 1, D = "", za = "", Vb, ac = 0, qd = 0, Fa, xa = "", bb = "", Kc = "", zd = !1, $c = !1, dd = !1, cd = !1, yc = !1, cb = !1, Ob = !0, hd = !1, Qb = !1, yb = !1, rb = !1, Nc = !1, vd = !1, kb = !1, ja = null, Ma = 0, fd = !1, Jd = 0, Ab = 0, Wb = null, F = null, ra = null, M = [], wc = null, ob = !1, nb = !1, pd = null, mb = null, L = "normal", Ya = "", tc = null, Zc = 100, Yb = 100, y = "", qb = 0, mc = null, qc = "", lb = 0, ia = "auto", Ua = 0, cc = "audio", Mb = "", Jc = 0, Va = 0, jd = 0, Ga = -1, V = "off", Vc = !1, xb = 1, kd = "127.0.0.1", xc = null, Ac = null, ed = null, zc = null, Oc = null, Ib = !0, Zb = "auto", sd = "", na = "", va = "", Tb = "", ud = 20, ad = 0, td = 0, bc = 0, Pc = null;
                0 == isNaN(parseInt(a.design_thumbh, 10)) && (a.design_thumbh = parseInt(a.design_thumbh, 10));
                window.dzsap_player_index++;
                W();
                "on" == a.autoplay && "on" == a.cue && (a.preload_method = "auto");
                var Ja = dzsap_generate_keyboard_controls();
                b.addClass("preload-method-" + a.preload_method);
                a.wavesurfer_pcm_length = Number(a.wavesurfer_pcm_length);
                "default" == a.skinwave_preloader_code && (a.skinwave_preloader_code = ' <svg class="loading-svg" width="30" height="30" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="#fff"> <g fill="none" fill-rule="evenodd" stroke-width="2"> <circle cx="22" cy="22" r="1"> <animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" /> <animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" /> </circle> <circle cx="22" cy="22" r="1"> <animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" /> <animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" /> </circle> </g> </svg> ');
                a.settings_trigger_resize = parseInt(a.settings_trigger_resize, 10);
                a.watermark_volume = parseFloat(a.watermark_volume);
                va = a.settings_extrahtml_in_float_right;
                0 < b.children(".extra-html-in-controls-right").length && (va += b.children(".extra-html-in-controls-right").eq(0).html());
                0 < b.children(".extra-html-in-controls-left").length && "" == a.settings_extrahtml_in_float_left && (a.settings_extrahtml_in_float_left = b.children(".extra-html-in-controls-left").eq(0).html());
                va && (va = String(va).replace(/{{svg_share_icon}}/g, '<svg class="svg-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 511.626 511.627" style="enable-background:new 0 0 511.626 511.627;" xml:space="preserve"> <g> <path d="M506.206,179.012L360.025,32.834c-3.617-3.617-7.898-5.426-12.847-5.426s-9.233,1.809-12.847,5.426 c-3.617,3.619-5.428,7.902-5.428,12.85v73.089h-63.953c-135.716,0-218.984,38.354-249.823,115.06C5.042,259.335,0,291.03,0,328.907 c0,31.594,12.087,74.514,36.259,128.762c0.57,1.335,1.566,3.614,2.996,6.849c1.429,3.233,2.712,6.088,3.854,8.565 c1.146,2.471,2.384,4.565,3.715,6.276c2.282,3.237,4.948,4.859,7.994,4.859c2.855,0,5.092-0.951,6.711-2.854 c1.615-1.902,2.424-4.284,2.424-7.132c0-1.718-0.238-4.236-0.715-7.569c-0.476-3.333-0.715-5.564-0.715-6.708 c-0.953-12.938-1.429-24.653-1.429-35.114c0-19.223,1.668-36.449,4.996-51.675c3.333-15.229,7.948-28.407,13.85-39.543 c5.901-11.14,13.512-20.745,22.841-28.835c9.325-8.09,19.364-14.702,30.118-19.842c10.756-5.141,23.413-9.186,37.974-12.135 c14.56-2.95,29.215-4.997,43.968-6.14s31.455-1.711,50.109-1.711h63.953v73.091c0,4.948,1.807,9.232,5.421,12.847 c3.62,3.613,7.901,5.424,12.847,5.424c4.948,0,9.232-1.811,12.854-5.424l146.178-146.183c3.617-3.617,5.424-7.898,5.424-12.847 C511.626,186.92,509.82,182.636,506.206,179.012z" fill="#696969"/> </g></svg> '));
                (function() {
                    b.css({
                        opacity: ""
                    });
                    b.addClass(a.extra_classes_player);
                    if (b.hasClass("dzsap-inited"))
                        return !1;
                    b.addClass("dzsap-inited");
                    window.dzsap_player_index++;
                    "" == a.design_skin && (a.design_skin = "skin-default");
                    / skin-/g.test(b.attr("class")) || b.addClass(a.design_skin);
                    b.hasClass("skin-default") && (a.design_skin = "skin-default");
                    b.hasClass("skin-wave") && (a.design_skin = "skin-wave");
                    b.hasClass("skin-justthumbandbutton") && (a.design_skin = "skin-justthumbandbutton");
                    b.hasClass("skin-pro") && (a.design_skin = "skin-pro");
                    b.hasClass("skin-aria") && (a.design_skin = "skin-aria");
                    b.hasClass("skin-silver") && (a.design_skin = "skin-silver");
                    b.hasClass("skin-redlights") && (a.design_skin = "skin-redlights");
                    b.hasClass("skin-steel") && (a.design_skin = "skin-steel");
                    b.hasClass("skin-customcontrols") && (a.design_skin = "skin-customcontrols");
                    "skin-wave" == a.design_skin && "auto" == a.scrubbar_type && (a.scrubbar_type = "wave");
                    "auto" == a.scrubbar_type && (a.scrubbar_type = "bar");
                    r();
                    "on" == b.attr("data-viewsubmitted") && (ia = "on");
                    b.attr("data-userstarrating") && (Ga = Number(b.attr("data-userstarrating")));
                    b.hasClass("skin-minimal") && (a.design_skin = "skin-minimal",
                    "default" == a.disable_volume && (a.disable_volume = "on"),
                    "default" == a.disable_scrub && (a.disable_scrub = "on"),
                    a.disable_timer = "on");
                    b.hasClass("skin-minion") && (a.design_skin = "skin-minion",
                    "default" == a.disable_volume && (a.disable_volume = "on"),
                    "default" == a.disable_scrub && (a.disable_scrub = "on"),
                    a.disable_timer = "on");
                    "skin-default" == a.design_skin && "default" == a.design_thumbh && (b.height(),
                    zd = !0);
                    dzsap_is_mobile() && c("body").addClass("is-mobile");
                    if ("on" == a.mobile_delete && dzsap_is_mobile()) {
                        var d = null;
                        b.parent().parent().hasClass("dzsap-sticktobottom") && (d = b.parent().parent());
                        d && (d.prev().hasClass("dzsap-sticktobottom-placeholder") && d.prev().remove(),
                        d.remove());
                        b.remove();
                        return !1
                    }
                    yd = can_canvas();
                    tb();
                    a.design_color_bg && (a.design_wave_color_bg = a.design_color_bg);
                    a.design_color_highlight && (a.design_wave_color_progress = a.design_color_highlight);
                    "skin-justthumbandbutton" == a.design_skin && ("default" == a.design_thumbh && (a.design_thumbh = ""),
                    a.disable_timer = "on",
                    a.disable_volume = "on",
                    "default" == a.design_animateplaypause && (a.design_animateplaypause = "on"));
                    "skin-redlights" == a.design_skin && (a.disable_timer = "on",
                    a.disable_volume = "off",
                    "default" == a.design_animateplaypause && (a.design_animateplaypause = "on"));
                    "skin-steel" == a.design_skin && ("default" == a.disable_timer && (a.disable_timer = "off"),
                    a.disable_volume = "on",
                    "default" == a.design_animateplaypause && (a.design_animateplaypause = "on"),
                    "default" == a.disable_scrub && (a.disable_scrub = "on"));
                    "skin-customcontrols" == a.design_skin && ("default" == a.disable_timer && (a.disable_timer = "on"),
                    a.disable_volume = "on",
                    "default" == a.design_animateplaypause && (a.design_animateplaypause = "on"),
                    "default" == a.disable_scrub && (a.disable_scrub = "on"));
                    "canvas" == a.skinwave_wave_mode && (a.skinwave_enableReflect = "off",
                    b.addClass("skin-wave-no-reflect"));
                    "reflecto" == a.skinwave_wave_mode_canvas_mode && (a.skinwave_wave_mode_canvas_reflection_size = .5);
                    "reflecto" == a.skinwave_wave_mode_canvas_mode && (reflection_size = .5);
                    "off" == a.skinwave_enableReflect && b.addClass("skin-wave-no-reflect");
                    "" == a.embed_code && 0 < b.find("div.feed-embed-code").length && (a.embed_code = b.find("div.feed-embed-code").eq(0).html());
                    "default" == a.design_animateplaypause && (a.design_animateplaypause = "off");
                    "on" == a.design_animateplaypause && b.addClass("design-animateplaypause");
                    "" == a.skinwave_comments_playerid ? ("undefined" != typeof b.attr("id") && (D = b.attr("id")),
                    b.attr("data-playerid") && (D = b.attr("data-playerid"))) : (D = a.skinwave_comments_playerid,
                    b.attr("id") || b.attr("id", D));
                    b.attr("data-playerid") || "" != D || (D = dzs_clean_string(b.attr("data-source")),
                    b.attr("data-playerid", D));
                    isNaN(Number(D));
                    "" == D && (a.skinwave_comments_enable = "off");
                    "on" == a.mobile_disable_fakeplayer && dzsap_is_mobile() && b.attr("data-fakeplayer", "");
                    b.attr("data-fakeplayer") && (d = c(b.attr("data-fakeplayer")),
                    0 == d.length && (d = c(String(b.attr("data-fakeplayer")).replace("#", ".")),
                    d.length && (a.fakeplayer = c(String(b.attr("data-fakeplayer")).replace("#", ".")),
                    b.attr("data-fakeplayer", String(b.attr("data-fakeplayer")).replace("#", ".")))),
                    0 == d.length ? b.attr("data-fakeplayer", "") : (b.addClass("player-is-feeding"),
                    b.attr("data-type") && (a.fakeplayer = c(b.attr("data-fakeplayer")).eq(0),
                    cc = b.attr("data-type"),
                    b.attr("data-original-type", cc))));
                    b.addClass("scrubbar-type-" + a.scrubbar_type);
                    0 < b.children(".extra-html").length && "" == a.settings_extrahtml && (a.settings_extrahtml = b.children(".extra-html").eq(0).html(),
                    mb = b.children(".extra-html").eq(0),
                    d = /{\{ratesubmitted=(.?)}}/g,
                    d.test(String(a.settings_extrahtml)) && (d.lastIndex = 0,
                    Ga = d.exec(String(a.settings_extrahtml))[1],
                    a.settings_extrahtml = String(a.settings_extrahtml).replace(d, ""),
                    a.parentgallery && void 0 != c(a.parentgallery).get(0) && void 0 != c(a.parentgallery).get(0).api_player_rateSubmitted && c(a.parentgallery).get(0).api_player_rateSubmitted()),
                    b.children(".extra-html").remove());
                    "on" == a.construct_player_list_for_sync && 0 == dzsap_list_for_sync_sw_built && (dzsap_list_for_sync_players = [],
                    dzsap_list_for_sync_sw_built = !0,
                    c(".audioplayer.is-single-player,.audioplayer-tobe.is-single-player").each(function() {
                        var a = c(this);
                        a.hasClass("dzsap_footer") || "on" != a.attr("data-do-not-include-in-list") && dzsap_list_for_sync_players.push(a)
                    }),
                    clearTimeout(dzsap_list_for_sync_inter_build),
                    dzsap_list_for_sync_inter_build = setTimeout(function() {
                        dzsap_list_for_sync_sw_built = !1
                    }, 500));
                    V = a.playfrom;
                    Qd(b.attr("data-playfrom")) && (V = b.attr("data-playfrom"));
                    0 == isNaN(parseInt(V, 10)) && (V = parseInt(V, 10));
                    ("off" == V || "" == V) && get_query_arg(window.location.href, "audio_time") && (V = xd(get_query_arg(window.location.href, "audio_time")));
                    za = D;
                    d = null;
                    d = ya ? ya : q ? q : null;
                    "dzs_footer" == za && (za = dzs_clean_string(b.attr("data-source")));
                    d && (d.attr("data-playerid") ? za = d.attr("data-playerid") : d.attr("data-source") && (za = d.attr("data-source")));
                    "youtube" == b.attr("data-type") && (y = a.type = "youtube");
                    "soundcloud" == b.attr("data-type") && (y = a.type = "soundcloud",
                    a.skinwave_enableSpectrum = "off",
                    b.removeClass("skin-wave-is-spectrum"));
                    "mediafile" == b.attr("data-type") && (y = a.type = "audio");
                    "shoutcast" == b.attr("data-type") && (a.type = "shoutcast",
                    y = "audio",
                    a.disable_timer = "on",
                    a.skinwave_enableSpectrum = "off",
                    "skin-default" == a.design_skin && (a.disable_scrub = "on"));
                    "" == y && (y = "audio");
                    na = "";
                    if ("normal" == y || "audio" == y)
                        b.attr("data-streamtype") && "off" != b.attr("data-streamtype") ? (na = b.attr("data-streamtype"),
                        b.attr("data-source"),
                        b.addClass("is-radio-type")) : na = "";
                    bb = b.attr("data-source");
                    "audio" == y && (bb = b.attr("data-source"));
                    if (!b.hasClass("audioplayer")) {
                        Hd = void 0 != b.attr("id") ? b.attr("id") : "ap" + dzsap_globalidind++;
                        Mb = "ytplayer_" + Hd;
                        b.removeClass("audioplayer-tobe");
                        b.addClass("audioplayer");
                        $b();
                        setTimeout(function() {
                            $b()
                        }, 1E3);
                        0 < b.find(".the-comments").length && 0 < b.find(".the-comments").eq(0).children().length ? mc = b.find(".the-comments").eq(0).children() : "on" == a.skinwave_comments_retrievefromajax && (d = {
                            action: "dzsap_get_comments",
                            postdata: "1",
                            playerid: D
                        },
                        a.settings_php_handler && c.ajax({
                            type: "POST",
                            url: a.settings_php_handler,
                            data: d,
                            success: function(a) {
                                b.prependOnce('<div class="the-comments"></div>', ".the-comments");
                                -1 < a.indexOf("a-comment") && (a = a.replace(/a-comment/g, "a-comment dzstooltip-con"),
                                a = a.replace(/dzstooltip arrow-bottom/g, "dzstooltip arrow-from-start transition-slidein arrow-bottom"));
                                b.find(".the-comments").eq(0).html(a);
                                mc = b.find(".the-comments").eq(0).children();
                                Ba({
                                    call_from: "ajax_complete"
                                })
                            },
                            error: function(a) {}
                        }));
                        "skin-wave" == a.design_skin && "canvas" == a.skinwave_wave_mode && Eb();
                        if (is_ios() || is_android())
                            a.autoplay = "off",
                            a.disable_volume = "on",
                            "off" == a.cue && (a.cue = "on"),
                            a.cue = "on";
                        "off" == a.cue && (b.addClass("cue-off"),
                        a.autoplay = "on");
                        "youtube" == y && n();
                        xa = b.attr("data-source");
                        void 0 != b.attr("data-source") && -1 < String(b.attr("data-source")).indexOf("https://soundcloud.com/") && (y = "soundcloud");
                        "soundcloud" == y && Fb();
                        S();
                        "skin-wave" != a.design_skin || "audio" != y && "soundcloud" != y && "fake" != y || "on" != a.skinwave_comments_enable || (d = '<div class="comments-holder">',
                        d = a.skinwave_comments_links_to ? d + ('<a href="' + a.skinwave_comments_links_to + '" target="_blank" class="the-bg"></a>') : d + '<div class="the-comments-holder-bg"></div>',
                        d += '</div><div class="clear"></div><div class="comments-writer"><div class="comments-writer-inner"><div class="setting"><div class="setting-label"></div><textarea name="comment-text" placeholder="Your comment.." type="text" class="comment-input"></textarea><div class="float-right"><button class="submit-ap-comment dzs-button-dzsap float-right">Submit</button><button class="cancel-ap-comment dzs-button-dzsap float-right">Cancel</button></div><div class="overflow-it"><input placeholder="Your email.." name="comment-email" type="text" class="comment-input"/></div><div class="clear"></div></div></div></div>',
                        "normal" == L ? ca.appendOnce(d) : b.appendOnce(d),
                        C = b.find(".comments-holder").eq(0),
                        X = b.find(".comments-writer").eq(0),
                        Ba({
                            call_from: "default"
                        }),
                        C.on("click", Gc),
                        X.find(".cancel-ap-comment").bind("click", lc),
                        X.find(".submit-ap-comment").bind("click", Lb));
                        "" != a.settings_extrahtml && (b.append('<div class="extra-html">' + a.settings_extrahtml + "</div>"),
                        b.children("extra-html"),
                        mb && mb.attr("data-playerid") && mb.attr("data-playerid"),
                        mb && mb.attr("data-posttype") && mb.attr("data-posttype"));
                        "on" == a.autoplay && "on" == a.cue && (Ua = 1);
                        "youtube" == y && is_ios();
                        if ("on" == a.cue && "soundcloud" != y)
                            if ((is_android() || is_ios()) && b.find(".playbtn").bind("click", Y),
                            Ya = b.attr("data-source"),
                            -1 < Ya.indexOf("{{generatenonce}}")) {
                                var g = "";
                                (d = /id=(\d*?)/g.exec(Ya)) && (g = d[1]);
                                c.ajax({
                                    type: "POST",
                                    url: Ya,
                                    data: {},
                                    success: function(a) {
                                        a && -1 < a.indexOf(g) && (b.attr("data-source", a),
                                        Da())
                                    }
                                })
                            } else
                                "icecast" != na ? (Da(),
                                "shoutcast" == na && setInterval(function() {
                                    k()
                                }, 1E4)) : "icecast" == na && setInterval(function() {
                                    k()
                                }, 1E4);
                        else
                            b.find(".playbtn").bind("click", hb),
                            b.find(".scrubbar").bind("click", hb),
                            Pa();
                        setInterval(function() {
                            $c = !0
                        }, 3E3);
                        setInterval(function() {
                            dd = !0
                        }, 2E3);
                        b.parent().hasClass("dzsap-sticktobottom") && (ja = b.parent());
                        b.parent().parent().hasClass("dzsap-sticktobottom") && (ja = b.parent().parent());
                        ja && (b.hasClass("theme-dark") && ja.addClass("theme-dark"),
                        setTimeout(function() {
                            ja.addClass("inited")
                        }, 500),
                        ja.addClass("dzsap-sticktobottom-for-" + a.design_skin),
                        ja.prev().addClass("dzsap-sticktobottom-for-" + a.design_skin),
                        "skin-wave" == a.design_skin && (ja.addClass("dzsap-sticktobottom-for-" + a.design_skin + "--mode-" + L),
                        ja.prev().addClass("dzsap-sticktobottom-for-" + a.design_skin + "--mode-" + L)),
                        Id = b.attr("class"),
                        (d = /(skinvariation-.*?)($| )/g.exec(Id)) && d[1] && (ja.addClass(d[1]),
                        ja.prev().addClass(d[1])));
                        b.get(0).api_destroy = kc;
                        b.get(0).api_play = Y;
                        b.get(0).api_get_last_vol = Od;
                        b.get(0).api_click_for_setup_media = hb;
                        b.get(0).api_init_loaded = Ea;
                        b.get(0).api_handleResize = Pa;
                        b.get(0).api_set_playback_speed = Sd;
                        b.get(0).api_change_media = hc;
                        b.get(0).api_seek_to_perc = Xb;
                        b.get(0).api_seek_to = oa;
                        b.get(0).api_seek_to_visual = Rd;
                        b.get(0).api_set_volume = db;
                        b.get(0).api_visual_set_volume = Cd;
                        b.get(0).api_destroy_listeners = jc;
                        b.get(0).api_pause_media = Qa;
                        b.get(0).api_pause_media_visual = Ed;
                        b.get(0).api_play_media = Y;
                        b.get(0).api_play_media_visual = Ec;
                        b.get(0).api_handle_end = sc;
                        b.get(0).api_change_visual_target = Cb;
                        b.get(0).api_change_design_color_highlight = Db;
                        b.get(0).api_draw_scrub_prog = $b;
                        b.get(0).api_draw_curr_time = Yc;
                        b.get(0).api_get_times = uc;
                        b.get(0).api_check_time = sa;
                        b.get(0).api_sync_players_goto_next = Wc;
                        b.get(0).api_sync_players_goto_prev = rd;
                        b.get(0).api_regenerate_playerlist_inner = function() {
                            Ia()
                        }
                        ;
                        b.get(0).api_get_time_curr = function() {
                            return Wa
                        }
                        ;
                        b.get(0).api_set_time_curr = function(a) {
                            ha = a;
                            0 == Z && 0 < aa && (ha = aa + ha)
                        }
                        ;
                        b.get(0).api_get_time_total = function() {
                            return U
                        }
                        ;
                        b.get(0).api_set_time_total = function(a) {
                            U = a
                        }
                        ;
                        b.get(0).api_seek_to_0 = function(a) {
                            oa(0)
                        }
                        ;
                        b.get(0).api_step_back = function(a) {
                            a || (a = Ja.step_back_amount);
                            oa(H - a)
                        }
                        ;
                        b.get(0).api_step_forward = function(a) {
                            a || (a = Ja.step_back_amount);
                            oa(H + a)
                        }
                        ;
                        b.get(0).api_playback_slow = function(a) {
                            console.log(m);
                            m && m.playbackRate && (m.playbackRate = .65)
                        }
                        ;
                        b.get(0).api_playback_reset = function(a) {
                            m && m.playbackRate && (m.playbackRate = 1)
                        }
                        ;
                        b.get(0).api_set_action_audio_play = function(a) {
                            Ac = a
                        }
                        ;
                        b.get(0).api_set_action_audio_pause = function(a) {
                            zc = a
                        }
                        ;
                        b.get(0).api_set_action_audio_end = function(a) {
                            xc = a;
                            b.data("has-action-end", "on")
                        }
                        ;
                        b.get(0).api_set_action_audio_comment = function(a) {
                            Oc = a
                        }
                        ;
                        b.get(0).api_try_to_submit_view = Gd;
                        a.action_audio_play && (Ac = a.action_audio_play);
                        a.action_audio_pause && (zc = a.action_audio_pause);
                        a.action_audio_play2 && (ed = a.action_audio_play2);
                        a.action_audio_end && (xc = a.action_audio_end,
                        b.data("has-action-end", "on"));
                        sa({
                            fire_only_once: !0
                        });
                        setInterval(u, 500);
                        "skin-minimal" == a.design_skin && sa({
                            fire_only_once: !0
                        });
                        b.on("click", ".dzsap-repeat-button,.dzsap-loop-button,.btn-zoomsounds-download,.zoomsounds-btn-step-backward,.zoomsounds-btn-step-forward,.zoomsounds-btn-go-beginning,.zoomsounds-btn-slow-playback,.zoomsounds-btn-reset, .playlist-menu-item, .tooltip-indicator--btn-footer-playlist", ub);
                        b.on("mouseenter", ub);
                        b.on("mouseleave", ub);
                        P.on("click", md);
                        b.on("click", ".skip-15-sec", function() {
                            b.get(0).api_step_forward(15)
                        });
                        c(window).on("resize.dzsap", Pa);
                        Pa();
                        w && w.get(0) && w.get(0).addEventListener("touchstart", function(a) {
                            ta && (fd = !0)
                        }, {
                            passive: !0
                        });
                        "icecast" != na && "shoutcast" != na || k();
                        c(document).on("touchmove", function(a) {
                            if (fd)
                                return Jd = a.originalEvent.touches[0].pageX,
                                Ab = Jd - w.offset().left,
                                0 > Ab && (Ab = 0),
                                Ab > w.width() && (Ab = w.width()),
                                Xb(Ab / w.width()),
                                !1
                        });
                        c(document).on("touchend", function(a) {
                            fd = !1
                        });
                        a.skinwave_comments_mode_outer_selector && (Ra = c(a.skinwave_comments_mode_outer_selector),
                        Ra.data ? (Ra.data("parent", b),
                        a.skinwave_comments_account && "none" != a.skinwave_comments_account && Ra.find(".comment_email,*[name=comment_user]").remove(),
                        Ra.on("click", ".comments-btn-cancel,.comments-btn-submit", l),
                        Ra.on("focusin", "input", l),
                        Ra.on("focusout", "input", l)) : console.log("%c, data not available .. ", "color: #990000;", c(a.skinwave_comments_mode_outer_selector)));
                        b.off("click", ".btn-like");
                        b.on("click", ".btn-like", Nd);
                        c(document).on("mousemove", ".star-rating-con", Xc);
                        c(document).on("mouseleave", ".star-rating-con", Xc);
                        c(document).on("click", ".star-rating-con", Xc);
                        setTimeout(function() {
                            Pa();
                            "canvas" == a.skinwave_wave_mode && (Bb(),
                            setTimeout(function() {
                                Bb()
                            }, 100))
                        }, 100);
                        b.find(".btn-menu-state").eq(0).bind("click", Fc);
                        b.on("click", ".prev-btn,.next-btn", ub)
                    }
                }
                )();
                return this
            })
        }
        ;
        c.fn.zoomsounds_nav = function(a) {
            "undefined" == typeof a && "undefined" != typeof c(this).attr("data-options") && "" != c(this).attr("data-options") && (a = c(this).attr("data-options"),
            eval("var aux_opts = " + a),
            a = aux_opts);
            a = c.extend({}, a);
            this.each(function() {
                c(this).children()
            })
        }
        ;
        c.fn.audiogallery = function(a) {
            if ("undefined" == typeof a && "undefined" != typeof c(this).attr("data-options") && "" != c(this).attr("data-options")) {
                var e = c(this).attr("data-options");
                eval("var aux_opts = " + e);
                a = aux_opts
            }
            a = c.extend({
                design_skin: "skin-default",
                cueFirstMedia: "on",
                autoplay: "off",
                settings_enable_linking: "off",
                autoplayNext: "on",
                design_menu_position: "bottom",
                design_menu_state: "open",
                design_menu_show_player_state_button: "off",
                design_menu_width: "default",
                design_menu_height: "200",
                design_menu_space: "default",
                settings_php_handler: "",
                design_menuitem_width: "default",
                design_menuitem_height: "default",
                design_menuitem_space: "default",
                force_autoplay_when_coming_from_share_link: "off",
                disable_menu_navigation: "off",
                loop_playlist: "on",
                menu_nav_type: "mousemove",
                menu_facebook_share: "auto",
                enable_easing: "off",
                settings_ap: "default",
                transition: "fade",
                embedded: "off",
                mode_showall_layout: "one-per-row",
                settings_mode: "mode-normal",
                settings_mode_showall_show_number: "on",
                mode_normal_video_mode: "auto"
            }, a);
            this.each(function() {
                function e() {
                    if (nc)
                        return !1;
                    t.remove();
                    t = null;
                    nc = !0
                }
                function f(a, e) {
                    a || (a = "title");
                    var f = function(f) {
                        var k = c(this);
                        this == window && (k = c(f));
                        f = "";
                        "title" == a && (f = k.find(".the-name").text());
                        return "" == e || -1 < f.toLowerCase().indexOf(e.toLowerCase()) ? !0 : !1
                    };
                    x.hasClass("isotoped") ? x.isotope({
                        filter: f
                    }) : x.children().each(function() {
                        f(this) ? c(this).fadeIn("fast") : c(this).fadeOut("fast")
                    })
                }
                function p() {
                    dzsap_list_for_sync_players = [];
                    x.children(".audioplayer,.audioplayer-tobe").each(function() {
                        var a = c(this);
                        a.addClass("feeded-whole-playlist");
                        "on" != a.attr("data-do-not-include-in-list") && dzsap_list_for_sync_players.push(a)
                    })
                }
                function n() {
                    if (oc)
                        return !1;
                    oc = !0;
                    var e = {
                        action: "dzsap_get_views_all",
                        postdata: "1"
                    };
                    a.settings_php_handler && c.ajax({
                        type: "POST",
                        url: a.settings_php_handler,
                        data: e,
                        success: function(a) {
                            t.attr("data-track-data", a);
                            r()
                        },
                        error: function(a) {}
                    })
                }
                function r() {
                    if (t.attr("data-track-data")) {
                        try {
                            wa = JSON.parse(t.attr("data-track-data"))
                        } catch (gb) {
                            console.log(gb)
                        }
                        var a = 0;
                        wa && wa.length && (Q.find(".menu-item-views").each(function() {
                            var e = c(this)
                              , f = e.html()
                              , k = /{{views_(.*?)}}/g.exec(f);
                            if (k && k[1]) {
                                var l = k[1];
                                for (var n in wa)
                                    if (l == wa[n].label || l == "ap" + wa[n].label) {
                                        f = f.replace(k[0], wa[n].views);
                                        a++;
                                        break
                                    }
                                e.html(f)
                            }
                        }),
                        a < wa.length && Q.find(".menu-item-views").each(function() {
                            var a = c(this)
                              , e = a.html()
                              , f = /{{views_(.*?)}}/g.exec(e);
                            f && f[0] && (e = e.replace(f[0], 0),
                            a.html(e))
                        }))
                    }
                }
                function l() {
                    return Fb
                }
                function v() {
                    var a = t.find(".items").eq(0).children(".audioplayer-tobe").length;
                    qa = [];
                    for (S = 0; S < a; S++) {
                        var c = t.find(".items").children(".audioplayer-tobe").eq(0)
                          , e = c.find(".menu-description").html();
                        var f = c;
                        f = f.attr("data-player-id") ? f.attr("data-player-id") : f.attr("id") ? f.attr("id") : f.attr("data-source") ? dzs_clean_string(f.attr("data-source")) : void 0;
                        qa.push({
                            menu_description: e,
                            player_id: f
                        });
                        x.append(c)
                    }
                    for (S = 0; S < qa.length; S++)
                        a = "",
                        qa[S].menu_description && -1 == qa[S].menu_description.indexOf('<div class="menu-item-thumb-con"><div class="menu-item-thumb" style="') && (a += " no-thumb"),
                        a = '<div class="menu-item' + a + '"  data-menu-index="' + S + '" data-gallery-id="' + ka + '" data-playerid="' + qa[S].player_id + '">',
                        t.hasClass("skin-aura") && (a += '<div class="menu-item-number">' + ++Fb + "</div>"),
                        a += qa[S].menu_description,
                        t.hasClass("skin-aura") && 1 == String(qa[S].menu_description).indexOf("menu-item-views") && (wa && 0 < wa.length ? a += '<div class="menu-item-views"></div>' : (n(),
                        a += '<div class="menu-item-views"><svg class="svg-icon" version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11.161px" height="12.817px" viewBox="0 0 11.161 12.817" enable-background="new 0 0 11.161 12.817" xml:space="preserve"> <g> <g> <g> <path fill="#D2D6DB" d="M8.233,4.589c1.401,0.871,2.662,1.77,2.801,1.998c0.139,0.228-1.456,1.371-2.896,2.177l-4.408,2.465 c-1.44,0.805-2.835,1.474-3.101,1.484c-0.266,0.012-0.483-1.938-0.483-3.588V3.666c0-1.65,0.095-3.19,0.212-3.422 c0.116-0.232,1.875,0.613,3.276,1.484L8.233,4.589z"/> </g> </g> </g> </svg>   <span class="the-count">{{views_' + qa[S].player_id + "}}</span></div>")),
                        a += "</div>",
                        R.append(a),
                        t.hasClass("skin-aura") && qa[S] && qa[S].menu_description && -1 < qa[S].menu_description.indexOf("float-right") && R.children().last().addClass("has-extra-info")
                }
                function fb() {
                    t.addClass("dzsag-loaded")
                }
                function Cb() {
                    if (0 == c(this).hasClass("active"))
                        return alert(ib),
                        !1
                }
                function Db() {
                    "undefined" != typeof x.children().eq(z).get(0) && "undefined" != typeof x.children().eq(z).get(0).api_play_media && x.children().eq(z).get(0).api_play_media({
                        call_from: "play_curr_media_gallery"
                    })
                }
                function hc(c) {
                    "mode-showall" == a.settings_mode && (z = c = x.children(".audioplayer,.audioplayer-tobe").index(c),
                    t.get(0).currNr_2 = c)
                }
                function jc() {
                    isNaN(jb) && (jb = 0);
                    Ub = jb;
                    Da = Kb - Ub;
                    jb = Number(Math.easeIn(1, Ub, Da, 20).toFixed(4));
                    0 == is_ios() && 0 == is_android() && R.css({
                        transform: "translateY(" + jb + "px)"
                    });
                    requestAnimFrame(jc)
                }
                function kc(e, f, k) {
                    e = {
                        action: "dzsap_submit_like",
                        postdata: e,
                        playerid: f
                    };
                    var l = {
                        refferer: null
                    };
                    k && (l = c.extend(l, k));
                    (a.settings_php_handler || cthis.hasClass("is-preview")) && c.ajax({
                        type: "POST",
                        url: a.settings_php_handler,
                        data: e,
                        success: function(a) {
                            l.refferer && l.refferer.addClass("active")
                        },
                        error: function(a) {}
                    })
                }
                function hb() {
                    0 == Q.height() ? (Q.css({
                        height: a.design_menu_height
                    }),
                    t.removeClass("menu-closed"),
                    t.addClass("menu-opened")) : (Q.css({
                        height: 0
                    }),
                    t.removeClass("menu-opened"),
                    t.addClass("menu-closed"));
                    setTimeout(function() {
                        Sa()
                    }, 400)
                }
                function Fc() {
                    "on" == a.autoplayNext && Eb()
                }
                function Gc() {
                    R.children(".menu-item").eq(z).find(".download-after-rate").addClass("active")
                }
                function fc() {
                    R.children(".menu-item").eq(z).find(".download-after-rate").addClass("active")
                }
                function lc() {
                    "mode-showall" != a.settings_mode && 0 == x.hasClass("isotoped") && "one" != a.mode_normal_video_mode && 0 == x.children().eq(z).hasClass("zoomsounds-wrapper-bg-bellow") && x.css("height", x.children().eq(z).outerHeight());
                    0 == x.hasClass("isotoped") && setTimeout(function() {
                        x.css("height", "auto")
                    }, 300);
                    Ba = Q.height();
                    Ta = R.outerHeight();
                    Ta > Ba && 0 < Ba ? (Q.unbind("mousemove", Lb),
                    Q.bind("mousemove", Lb)) : Q.unbind("mousemove", Lb);
                    "on" == a.embedded && window.frameElement && (window.frameElement.height = t.height())
                }
                function gc() {
                    Q && (Ta = R.outerHeight())
                }
                function Lb(e) {
                    var f = c(this);
                    f.offset();
                    e = e.pageY - f.offset().top;
                    Ta <= Ba || (Ba = Q.outerHeight(),
                    e = e / Ba * -(Ta - Ba + 50) + 20,
                    0 < e && (e = 0),
                    e < -(Ta - Ba + 10) && (e = -(Ta - Ba + 10)),
                    Kb = e,
                    0 == is_ios() && 0 == is_android() && "on" != a.enable_easing && R.css({
                        transform: "translateY(" + Kb + "px)"
                    }))
                }
                function Jb(a) {
                    var e = c(this);
                    if ("click" == a.type && (e.hasClass("menu-item") && (a = e.parent().children().index(e),
                    ua(a)),
                    e.hasClass("menu-btn-like") || e.hasClass("menu-facebook-share")))
                        return e.parent().parent().attr("data-playerid") && kc(1, e.parent().parent().attr("data-playerid"), {
                            refferer: e
                        }),
                        !1
                }
                function Sa() {
                    "mode-showall" != a.settings_mode && 0 == x.hasClass("isotoped") && setTimeout(function() {
                        x.css("height", x.children().eq(z).outerHeight())
                    }, 500);
                    lc()
                }
                function Nb() {
                    x.children().eq(tb).removeClass("transitioning-out");
                    x.children().eq(z).removeClass("transitioning-in");
                    tb = z;
                    Ia = !1
                }
                function Hc() {
                    t.parent().children(".the-bg").eq(0).remove();
                    Ia = !1
                }
                function sb() {
                    ba = z;
                    ba--;
                    var c = !0;
                    0 > ba && (ba = x.children().length - 1,
                    "off" == a.loop_playlist && (c = !1));
                    c && ua(ba)
                }
                function Eb() {
                    ba = z;
                    var c = !0;
                    "mode-showall" == a.settings_mode && (ba = t.get(0).currNr_2);
                    ba++;
                    ba >= x.children().length && (ba = 0,
                    "off" == a.loop_playlist && (c = !1));
                    c && ua(ba)
                }
                function ua(e, f) {
                    var k = {
                        ignore_arg_currNr_check: !1,
                        ignore_linking: !1,
                        donotopenlink: "off"
                    };
                    f && (k = c.extend(k, f));
                    if (1 != Ia)
                        if ("last" == e && (e = x.children().length - 1),
                        z == e)
                            x && x.children().eq(z).get(0) && x.children().eq(z).get(0).api_play_media && x.children().eq(z).get(0).api_play_media({
                                call_from: "gallery"
                            });
                        else {
                            da = x.children(".audioplayer,.audioplayer-tobe").eq(e);
                            f = "";
                            -1 < z && ("undefined" != typeof x.children().eq(z).get(0) && ("undefined" != typeof x.children().eq(z).get(0).api_pause_media && x.children().eq(z).get(0).api_pause_media(),
                            "undefined" != typeof x.children().eq(z).get(0).api_get_last_vol && (f = x.children().eq(z).get(0).api_get_last_vol())),
                            R.children().removeClass("active active-from-gallery"),
                            "one" != a.mode_normal_video_mode && "mode-showall" != a.settings_mode && (x.children().eq(z).removeClass("active active-from-gallery"),
                            R.children().eq(z).removeClass("active active-from-gallery"),
                            "fade" == a.transition && (x.children().eq(z).animate({}, {
                                queue: !1
                            }),
                            setTimeout(Nb, 300),
                            Ia = !0),
                            "direct" == a.transition && Nb()));
                            "sameasgallery" == a.settings_ap.design_skin && (a.settings_ap.design_skin = a.design_skin);
                            -1 == z && "on" == a.autoplay && (a.settings_ap.autoplay = "on");
                            -1 < z && "on" == a.autoplayNext && (a.settings_ap.autoplay = "on");
                            a.settings_ap.parentgallery = t;
                            a.settings_ap.design_menu_show_player_state_button = a.design_menu_show_player_state_button;
                            a.settings_ap.cue = "on";
                            1 == Ha && ("off" == a.cueFirstMedia && (a.settings_ap.cue = "off"),
                            Ha = !1);
                            var l = c.extend({}, a.settings_ap);
                            l.volume_from_gallery = f;
                            l.call_from = "gotoItem";
                            l.player_navigation = a.player_navigation;
                            if ("one" == a.mode_normal_video_mode && 0 < e) {
                                var n = x.children().eq(0).get(0);
                                n && n.api_play_media && (n.api_change_media(x.children().eq(e), {
                                    call_from: "goto_item -- mode_normal_video_mode()"
                                }),
                                "on" == a.autoplayNext && setTimeout(function() {
                                    n.api_play_media()
                                }, 200))
                            } else
                                Pb(da, l),
                                "on" == a.autoplayNext && ("mode-showall" == a.settings_mode && (z = t.get(0).currNr_2),
                                -1 < z && da.get(0) && da.get(0).api_play && da.get(0).api_play());
                            dzsap_currplayer_focused = da.get(0);
                            "mode-showall" != a.settings_mode && ("fade" == a.transition && (da.css({}),
                            da.animate({}, {
                                queue: !1
                            })),
                            da.addClass("transitioning-in"),
                            "link" != da.attr("data-type") && 0 == k.ignore_linking && "on" == a.settings_enable_linking && history.pushState({
                                foo: "bar"
                            }, null, add_query_arg(window.location.href, "audiogallery_startitem_" + ka, e)));
                            da.addClass("active active-from-gallery");
                            R.children().eq(e).addClass("active active-from-gallery");
                            k = "";
                            da.attr("data-bgimage") && (k = da.attr("data-bgimage"));
                            da.attr("data-wrapper-image") && (k = da.attr("data-wrapper-image"));
                            k && t.parent().hasClass("ap-wrapper") && 0 < t.parent().children(".the-bg").length && (t.parent().children(".the-bg").eq(0).after('<div class="the-bg" style="background-image: url(' + k + ');"></div>'),
                            t.parent().children(".the-bg").eq(0).css({
                                opacity: 1
                            }),
                            t.parent().children(".the-bg").eq(1).css({
                                opacity: 0
                            }),
                            t.parent().children(".the-bg").eq(1).animate({
                                opacity: 1
                            }, {
                                queue: !1,
                                duration: 1E3,
                                complete: Hc,
                                step: function() {
                                    Ia = !0
                                }
                            }),
                            Ia = !0);
                            "mode-showall" != a.settings_mode && (z = e,
                            t.data("currNr", z));
                            x.children().eq(z).get(0) && x.children().eq(z).get(0).api_handleResize && x.children().eq(z).hasClass("media-setuped") && x.children().eq(z).get(0).api_handleResize();
                            lc()
                        }
                }
                function Pb(e, f) {
                    var k = c.extend({}, a.settings_ap);
                    f && (k = c.extend(k, f));
                    e.hasClass("audioplayer-tobe") && (a.settings_ap.call_from = "init player from gallery",
                    e.audioplayer(k))
                }
                var t = c(this);
                t.children();
                var ka = "ag1", z = -1, tb = 0, Fb = 0, ba = 0, Ia = !0, S = 0, Ba, Ta, Sb, x, Q, R, da;
                Ia = !1;
                var Ha = !0
                  , nc = !0
                  , pc = !1
                  , oc = !1
                  , qa = []
                  , wa = []
                  , ib = "You need to comment or rate before downloading."
                  , jb = 0
                  , Ub = 0
                  , Kb = 0
                  , Da = 0;
                window.dzsap_settings && "undefined" != typeof window.dzsap_settings.str_alertBeforeRate && (ib = window.dzsap_settings.str_alertBeforeRate);
                t.get(0).currNr_2 = -1;
                (function() {
                    if (t.attr("data-player-options"))
                        try {
                            "default" == a.settings_ap && (a.settings_ap = JSON.parse(t.attr("data-player-options")))
                        } catch (gb) {
                            console.log("json not correct .. data-player-options", t.attr("data-player-options"))
                        }
                    "default" == a.settings_ap && (a.settings_ap = {});
                    "default" == a.design_menu_width && (a.design_menu_width = "100%");
                    "default" == a.design_menu_height && (a.design_menu_height = "200");
                    t.hasClass("skin-wave") && (a.design_skin = "skin-wave");
                    t.hasClass("skin-default") && (a.design_skin = "skin-default");
                    t.hasClass("skin-aura") && (a.design_skin = "skin-aura");
                    t.addClass(a.settings_mode);
                    t.append('<div class="slider-main"><div class="slider-clipper"></div></div>');
                    t.addClass("menu-position-" + a.design_menu_position);
                    Sb = t.find(".slider-main").eq(0);
                    var k = t.find(".items").children(".audioplayer-tobe").length;
                    a.settings_ap.disable_player_navigation = a.disable_player_navigation;
                    if (0 == k || 1 == k)
                        a.design_menu_position = "none",
                        a.settings_ap.disable_player_navigation = "on";
                    k = '<div class="nav-main zoomsounds-nav ' + a.design_skin + " nav-type-" + a.menu_nav_type + '"><div class="nav-clipper"></div></div>';
                    "top" == a.design_menu_position && Sb.before(k);
                    "bottom" == a.design_menu_position && Sb.after(k);
                    !a.settings_php_handler && a.settings_ap.settings_php_handler && (a.settings_php_handler = a.settings_ap.settings_php_handler);
                    if (typeof t.attr("id"))
                        ka = t.attr("id");
                    else {
                        for (k = 0; 0 == c("ag" + k).length; )
                            k++;
                        ka = "ag" + k;
                        t.attr("id", ka)
                    }
                    x = t.find(".slider-clipper").eq(0);
                    Q = t.find(".nav-main").eq(0);
                    R = t.find(".nav-clipper").eq(0);
                    t.children(".extra-html").length && t.append(t.children(".extra-html"));
                    "mode-showall" == a.settings_mode && x.addClass("layout-" + a.mode_showall_layout);
                    v();
                    "on" == a.disable_menu_navigation && Q.hide();
                    Q.css({
                        height: a.design_menu_height
                    });
                    (is_ios() || is_android()) && Q.css({
                        overflow: "auto"
                    });
                    r();
                    "closed" == a.design_menu_state ? (Q.css({
                        height: 0
                    }),
                    t.removeClass("menu-opened"),
                    t.addClass("menu-closed")) : (t.addClass("menu-opened"),
                    t.removeClass("menu-closed"));
                    0 == can_history_api() && (a.settings_enable_linking = "off");
                    0 == t.css("opacity") && t.animate({
                        opacity: 1
                    }, 1E3);
                    c(window).bind("resize", Sa);
                    Sa();
                    setTimeout(Sa, 1E3);
                    t.get(0).api_skin_redlights_give_controls_right_to_all = function() {
                        pc = !0
                    }
                    ;
                    get_query_arg(window.location.href, "audiogallery_startitem_" + ka) && (tb = ba = Number(get_query_arg(window.location.href, "audiogallery_startitem_" + ka)),
                    Number(get_query_arg(window.location.href, "audiogallery_startitem_" + ka)) && 0 < Number(get_query_arg(window.location.href, "audiogallery_startitem_" + ka)) && "on" == a.force_autoplay_when_coming_from_share_link && (a.autoplay = "on"));
                    "mode-normal" == a.settings_mode && ua(ba);
                    "mode-showall" == a.settings_mode && (x.children().each(function() {
                        var e = c(this)
                          , f = e.parent().children(".audioplayer,.audioplayer-tobe").index(e);
                        if (e.hasClass("audioplayer-tobe")) {
                            var k = Object.assign({}, a.settings_ap);
                            k.parentgallery = t;
                            k.call_from = "mode show-all";
                            k.action_audio_play = hc;
                            e.audioplayer(k);
                            f = String(f + 1);
                            2 > f.length && (f = "0" + f);
                            "one-per-row" == a.mode_showall_layout && "off" != a.settings_mode_showall_show_number && (e.before('<div class="number-wrapper"><span class="the-number">' + f + "</span></div>"),
                            e.after('<div class="clear for-number-wrapper"></div>'))
                        }
                    }),
                    c.fn.isotope && "one-per-row" != a.mode_showall_layout && (x.find(".audioplayer,.audioplayer-tobe").addClass("isotope-item"),
                    setTimeout(function() {
                        x.prepend('<div class="grid-sizer"></div>');
                        x.isotope({
                            itemSelector: ".isotope-item",
                            layoutMode: "fitRows",
                            percentPosition: !0,
                            masonry: {
                                columnWidth: ".grid-sizer"
                            }
                        });
                        x.addClass("isotoped");
                        setTimeout(function() {
                            x.isotope("layout")
                        }, 900)
                    }, 300),
                    x.append('<div class="clear"></div>')),
                    pc && x.children(".audioplayer").each(function() {
                        var a = c(this);
                        0 == a.find(".ap-controls-right").eq(0).prev().hasClass("controls-right") && a.find(".ap-controls-right").eq(0).before('<div class="controls-right"> </div>')
                    }));
                    R.on("click", ".menu-btn-like,.menu-facebook-share", Jb);
                    R.on("click", ".menu-item", Jb);
                    t.find(".download-after-rate").bind("click", Cb);
                    t.get(0).api_regenerate_sync_players_with_this_playlist = p;
                    t.get(0).api_goto_next = Eb;
                    t.get(0).api_goto_prev = sb;
                    t.get(0).api_goto_item = ua;
                    t.get(0).api_gallery_handle_end = Fc;
                    t.get(0).api_toggle_menu_state = hb;
                    t.get(0).api_handleResize = Sa;
                    t.get(0).api_player_commentSubmitted = Gc;
                    t.get(0).api_player_rateSubmitted = fc;
                    t.get(0).api_reinit = v;
                    t.get(0).api_play_curr_media = Db;
                    t.get(0).api_get_nr_children = l;
                    t.get(0).api_init_player_from_gallery = Pb;
                    t.get(0).api_filter = f;
                    t.get(0).api_destroy = e;
                    setInterval(gc, 1E3);
                    setTimeout(fb, 700);
                    "on" == a.enable_easing && jc();
                    t.addClass("dzsag-inited");
                    t.addClass("transition-" + a.transition)
                }
                )()
            })
        }
        ;
        window.dzsag_init = function(a, e) {
            if ("undefined" != typeof e && "undefined" != typeof e.init_each && 1 == e.init_each) {
                var f = 0, k;
                for (k in e)
                    f++;
                1 == f && (e = void 0);
                c(a).each(function() {
                    c(this).audiogallery(e)
                })
            } else
                c(a).audiogallery(e)
        }
    }
    )(jQuery)
}
function register_dzsap_aux_script() {
    jQuery(document).ready(function(c) {
        function f() {
            clearTimeout(p);
            p = setTimeout(function() {
                c(".dzsap-sticktobottom").length && (dzsap_sticktobottom_con = c(".dzsap-sticktobottom").eq(0));
                if (dzsap_sticktobottom_con) {
                    var a = "body .dzsap-sticktobottom:not(.audioplayer-loaded){bottom: -" + (dzsap_sticktobottom_con.outerHeight() + "px");
                    window.dzsap__style.html(a + "}")
                }
            }, 300)
        }
        function v(a) {
            var e = {
                call_from: "default",
                lightbox_open: "share",
                overwrite_this: null
            };
            a && (e = c.extend(e, a));
            var f = window.dzsap_box_main_con;
            a = c(this);
            e.overwrite_this && (a = c(e.overwrite_this));
            if (a.data("cthis")) {
                var k = a.data("cthis");
                console.log("found cthis in data")
            }
            k ? window.dzsap_currplayer_from_share = k : (console.log("%c could not find this .. maybe we can find it in post_id", "background-color: #da0000;", c('.audioplayer[data-playerid="' + a.attr("data-post_id") + '"]')),
            a.attr("data-post_id") ? (window.dzsap_currplayer_from_share = c('.audioplayer[data-playerid="' + a.attr("data-post_id") + '"]').eq(0),
            a.data("cthis", window.dzsap_currplayer_from_share)) : a.parent().parent().parent().parent().parent().parent().hasClass("audioplayer") && (window.dzsap_currplayer_from_share = a.parent().parent().parent().parent().parent().parent()));
            console.log("_t -> ", a, a.data("cthis"));
            console.log("window.dzsap_currplayer_from_share -> ", window.dzsap_currplayer_from_share);
            console.log("_c_mc -5", f);
            k = "";
            window.dzsap_social_feed_for_social_networks && (k = window.dzsap_social_feed_for_social_networks);
            if (window.dzsap_box_main_con) {
                console.log("window.dzsap_box_main_con - ", window.dzsap_box_main_con);
                window.dzsap_box_main_con.find(".social-networks-con").html(k);
                k = "";
                window.dzsap_social_feed_for_share_link && (k = window.dzsap_social_feed_for_share_link);
                if (k) {
                    var p = window.location.href;
                    a.attr("data-post-url") && (p = a.attr("data-post-url"));
                    k = k.replace("{{replacewithcurrurl}}", p);
                    k = k.replace("{{replacewithdataurl}}", p);
                    window.dzsap_box_main_con.find(".share-link-con").html(k)
                }
                a = "";
                window.dzsap_social_feed_for_embed_link && (a = window.dzsap_social_feed_for_embed_link);
                window.dzsap_currplayer_from_share && dzsap_currplayer_from_share.data("embed_code") && (console.log("o.embed_code - ", dzsap_currplayer_from_share.data("embed_code")),
                a && (k = dzsap_currplayer_from_share.data("embed_code"),
                -1 == k.indexOf("&lt;") && (k = htmlEntities(k)),
                a = a.replace("{{replacewithembedcode}}", k),
                f.find(".embed-link-con").html(a)));
                c(document).on("click.dzsap", ".field-for-view", function() {
                    console.log("select all test ", this);
                    if (document.selection) {
                        var a = document.body.createTextRange();
                        a.moveToElementText(this);
                        a.select()
                    } else
                        window.getSelection && (a = document.createRange(),
                        a.selectNode(this),
                        window.getSelection().removeAllRanges(),
                        window.getSelection().addRange(a))
                });
                f.addClass("loading-box-main-" + e.lightbox_open);
                setTimeout(function() {
                    f.addClass("loading-item")
                }, 100);
                setTimeout(function() {
                    f.addClass("loaded-item")
                }, 200)
            } else
                console.log("warning missing box-main")
        }
        c("body").append('<style class="dzsap--style"></style>');
        window.dzsap__style = c(".dzsap--style");
        c(window).on("resize.dzsapmain", f);
        c(document).on("focus.dzsap", "input", function() {
            window.dzsap_currplayer_focused = null
        });
        var p = 0;
        f();
        c("audio.zoomsounds-from-audio").each(function() {
            var a = c(this);
            a.after('<div class="audioplayer-tobe auto-init skin-silver" data-source="' + a.attr("src") + '"></div>');
            a.remove()
        });
        c(".audioplayer,.audioplayer-tobe").each(function() {
            var a = c(this);
            a.hasClass("auto-init") && 1 == a.hasClass("audioplayer-tobe") && window.dzsap_init && dzsap_init(a, {
                init_each: !0
            })
        });
        dzsag_init(".audiogallery.auto-init", {
            init_each: !0
        });
        c(document).on("click.dzsap_metas", ".audioplayer-song-changer, .dzsap-wishlist-but", function() {
            var a = c(this);
            if (a.hasClass("audioplayer-song-changer")) {
                var e = c(a.attr("data-fakeplayer")).eq(0);
                e && e.get(0) && e.get(0).api_change_media && e.get(0).api_change_media(a, {
                    feeder_type: "button",
                    call_from: "changed audioplayer-song-changer"
                });
                return !1
            }
            if (a.hasClass("dzsap-wishlist-but"))
                return e = {
                    action: "dzsap_add_to_wishlist",
                    playerid: a.attr("data-post_id"),
                    wishlist_action: "add"
                },
                a.find(".svg-icon").hasClass("fa-star") && (e.wishlist_action = "remove"),
                window.dzsap_lasto.settings_php_handler && c.ajax({
                    type: "POST",
                    url: window.dzsap_lasto.settings_php_handler,
                    data: e,
                    success: function(c) {
                        a.find(".svg-icon").hasClass("fa-star-o") ? a.find(".svg-icon").eq(0).attr("class", "svg-icon fa fa-star") : a.find(".svg-icon").eq(0).attr("class", "svg-icon fa fa-star-o")
                    },
                    error: function(a) {}
                }),
                !1
        });
        c(document).on("click.dzsiconhide", ".sticktobottom-close-con,.sticktobottom-close-con .svg-icon", function() {
            var a = c(this);
            c(".dzsap-sticktobottom .audioplayer").get(0).api_pause_media();
            console.log("_t sticktobottom-close-con -7", a);
            var e = null;
            a.parent().hasClass("dzsap-sticktobottom") && (e = a.parent());
            a.parent().parent().hasClass("dzsap-sticktobottom") && (e = a.parent().parent());
            a.parent().parent().parent().hasClass("dzsap-sticktobottom") && (e = a.parent().parent().parent());
            console.log("_con - ", e, e.hasClass("audioplayer-loaded"));
            e.hasClass("audioplayer-loaded") ? e.removeClass("audioplayer-loaded") : e.addClass("audioplayer-loaded");
            e.addClass("audioplayer-was-loaded");
            return !1
        });
        c(document).on("click.dzsiconshow", ".dzsap-sticktobottom .icon-show", function() {
            c(this);
            return !1
        });
        0 < c(".dzsap-sticktobottom.dzsap-sticktobottom-for-skin-silver").length && setInterval(function() {
            c(".dzsap-sticktobottom.dzsap-sticktobottom-for-skin-silver  .audioplayer").eq(0).hasClass("dzsap-loaded") && (c(".dzsap-sticktobottom-placeholder").eq(0).addClass("active"),
            0 == c(".dzsap-sticktobottom").hasClass("audioplayer-was-loaded") && c(".dzsap-sticktobottom.dzsap-sticktobottom-for-skin-silver").addClass("audioplayer-loaded"))
        }, 1E3);
        0 < c(".dzsap-sticktobottom.dzsap-sticktobottom-for-skin-wave").length && setInterval(function() {
            c(".dzsap-sticktobottom.dzsap-sticktobottom-for-skin-wave  .audioplayer").eq(0).hasClass("dzsap-loaded") && (c(".dzsap-sticktobottom-placeholder").eq(0).addClass("active"),
            0 == c(".dzsap-sticktobottom").hasClass("audioplayer-was-loaded") && c(".dzsap-sticktobottom.dzsap-sticktobottom-for-skin-wave").addClass("audioplayer-loaded"))
        }, 1E3);
        c(document).on("click.dzsap_multisharer", ".dzsap-multisharer-but", function(a, e) {
            a = {
                call_from: "default"
            };
            e && c.extend(a, e);
            console.log("click_open_embed_ultibox() this - ", this);
            v({
                call_from: "click_open_embed_ultibox",
                lightbox_open: "share",
                overwrite_this: this
            });
            return !1
        });
        c(document).on("keydown.dzsapkeyup keypress.dzsapkeyup", function(a) {
            var e = c.extend({}, dzsap_generate_keyboard_controls());
            if (dzsap_currplayer_focused && dzsap_currplayer_focused.api_pause_media) {
                var f = !1;
                -1 < e.pause_play.indexOf("ctrl+") ? a.ctrlKey && (e.pause_play = e.pause_play.replace("ctrl+", ""),
                a.keyCode == e.pause_play && (f = !0)) : a.keyCode == e.pause_play && (f = !0);
                if (f && 0 == c(dzsap_currplayer_focused).hasClass("comments-writer-active") && (c(dzsap_currplayer_focused).hasClass("is-playing") ? dzsap_currplayer_focused.api_pause_media() : dzsap_currplayer_focused.api_play_media(),
                window.dzsap_mouseover))
                    return a.preventDefault(),
                    !1;
                f = !1;
                -1 < e.step_back.indexOf("ctrl+") ? a.ctrlKey && (e.step_back = e.step_back.replace("ctrl+", ""),
                a.keyCode == e.step_back && (f = !0)) : a.keyCode == e.step_back && (f = !0);
                f && dzsap_currplayer_focused.api_step_back(e.step_back_amount);
                f = !1;
                -1 < e.step_forward.indexOf("ctrl+") ? a.ctrlKey && (e.step_forward = e.step_forward.replace("ctrl+", ""),
                a.keyCode == e.step_forward && (f = !0)) : a.keyCode == e.step_forward && (f = !0);
                f && dzsap_currplayer_focused.api_step_forward(e.step_back_amount);
                f = !1;
                a.keyCode == e.sync_players_goto_next && (f = !0);
                f && dzsap_currplayer_focused && dzsap_currplayer_focused.api_sync_players_goto_next && dzsap_currplayer_focused.api_sync_players_goto_next();
                f = !1;
                a.keyCode == e.sync_players_goto_prev && (f = !0);
                f && dzsap_currplayer_focused && dzsap_currplayer_focused.api_sync_players_goto_prev && dzsap_currplayer_focused.api_sync_players_goto_prev()
            }
        });
        c(document).on("keydown blur", ".zoomsounds-search-field", function(a) {
            var e = c(a.currentTarget);
            setTimeout(function() {
                if (e) {
                    var a = c(".audiogallery").eq(0);
                    e.attr("data-target") && (a = c(e.attr("data-target")));
                    a.get(0) && a.get(0).api_filter && a.get(0).api_filter("title", e.val())
                }
            }, 100)
        });
        c(document).on("click", ".dzsap-like-but", function(a) {
            var e = c(this)
              , f = e.attr("data-post_id");
            f && "0" != f || e.parent().parent().parent().parent().parent().hasClass("audioplayer") && (f = e.parent().parent().parent().parent().parent().attr("data-feed-playerid"));
            window.dzsap_submit_like(f, a);
            e.removeClass("dzsap-like-but").addClass("dzsap-retract-like-but");
            return !1
        });
        c(document).on("click", ".dzsap-retract-like-but", function(a) {
            var e = c(this)
              , f = e.attr("data-post_id");
            f && "0" != f || e.parent().parent().parent().parent().parent().hasClass("audioplayer") && (f = e.parent().parent().parent().parent().parent().attr("data-feed-playerid"));
            window.dzsap_retract_like(f, a);
            e.addClass("dzsap-like-but").removeClass("dzsap-retract-like-but");
            return !1
        });
        window.dzsap_submit_like = function(a, e) {
            a = {
                action: "dzsap_submit_like",
                playerid: a
            };
            var f = null;
            e && (f = c(e.currentTarget));
            window.dzsap_settings && window.dzsap_settings.ajax_url && c.ajax({
                type: "POST",
                url: window.dzsap_settings.ajax_url,
                data: a,
                success: function(a) {
                    "undefined" != typeof window.console && console.log("Got this from the server: " + a);
                    f && (a = f.html(),
                    f.html(a.replace("fa-heart-o", "fa-heart")))
                },
                error: function(a) {}
            })
        }
        ;
        window.dzsap_retract_like = function(a, e) {
            a = {
                action: "dzsap_retract_like",
                playerid: a
            };
            var f = null;
            e && (f = c(e.currentTarget));
            window.dzsap_settings && window.dzsap_settings.ajax_url && c.ajax({
                type: "POST",
                url: window.dzsap_settings.ajax_url,
                data: a,
                success: function(a) {
                    "undefined" != typeof window.console && console.log("Got this from the server: " + a);
                    f && (a = f.html(),
                    f.html(a.replace("fa-heart", "fa-heart-o")))
                },
                error: function(a) {}
            })
        }
    });
    jQuery.fn.textWidth = function() {
        var c = jQuery(this)
          , f = c.html();
        "INPUT" == c[0].nodeName && (f = c.val());
        f = '<span class="forcalc">' + f + "</span>";
        jQuery("body").append(f);
        f = jQuery("span.forcalc").last();
        f.css({
            "font-size": c.css("font-size"),
            "font-family": c.css("font-family")
        });
        c = f.width();
        f.remove();
        return c
    }
}
function is_ie() {
    return -1 != navigator.appVersion.indexOf("MSIE") ? !0 : !1
}
function is_firefox() {
    return -1 != navigator.userAgent.indexOf("Firefox") ? !0 : !1
}
function is_opera() {
    return -1 != navigator.userAgent.indexOf("Opera") ? !0 : !1
}
function is_chrome() {
    return -1 < navigator.userAgent.toLowerCase().indexOf("chrome")
}
function is_safari() {
    return 0 < Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")
}
function version_ie() {
    return parseFloat(navigator.appVersion.split("MSIE")[1])
}
function version_firefox() {
    if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))
        return new Number(RegExp.$1)
}
function version_opera() {
    if (/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent))
        return new Number(RegExp.$1)
}
function can_play_mp3() {
    var c = document.createElement("audio");
    return !(!c.canPlayType || !c.canPlayType("audio/mpeg;").replace(/no/, ""))
}
function can_canvas() {
    return document.createElement("canvas").getContext("2d") ? !0 : !1
}
function onYouTubeIframeAPIReady() {
    for (i = 0; i < dzsap_yt_list.length; i++)
        void 0 != dzsap_yt_list[i].get(0) && "undefined" != typeof dzsap_yt_list[i].get(0).fn_yt_ready && dzsap_yt_list[i].get(0).fn_yt_ready()
}
window.requestAnimFrame = function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(c, f) {
        window.setTimeout(c, 1E3 / 60)
    }
}();
var MD5 = function(c) {
    function f(a, c) {
        var e = a & 2147483648
          , f = c & 2147483648
          , k = a & 1073741824
          , l = c & 1073741824;
        a = (a & 1073741823) + (c & 1073741823);
        return k & l ? a ^ 2147483648 ^ e ^ f : k | l ? a & 1073741824 ? a ^ 3221225472 ^ e ^ f : a ^ 1073741824 ^ e ^ f : a ^ e ^ f
    }
    function v(a, c, e, k, l, n, p) {
        a = f(a, f(f(c & e | ~c & k, l), p));
        return f(a << n | a >>> 32 - n, c)
    }
    function p(a, c, e, k, l, n, p) {
        a = f(a, f(f(c & k | e & ~k, l), p));
        return f(a << n | a >>> 32 - n, c)
    }
    function a(a, c, e, k, l, n, p) {
        a = f(a, f(f(c ^ e ^ k, l), p));
        return f(a << n | a >>> 32 - n, c)
    }
    function e(a, c, e, k, l, n, p) {
        a = f(a, f(f(e ^ (c | ~k), l), p));
        return f(a << n | a >>> 32 - n, c)
    }
    function W(a) {
        var c = "", e;
        for (e = 0; 3 >= e; e++) {
            var f = a >>> 8 * e & 255;
            f = "0" + f.toString(16);
            c += f.substr(f.length - 2, 2)
        }
        return c
    }
    var k = [];
    c = function(a) {
        a = a.replace(/\r\n/g, "\n");
        for (var c = "", e = 0; e < a.length; e++) {
            var f = a.charCodeAt(e);
            128 > f ? c += String.fromCharCode(f) : (127 < f && 2048 > f ? c += String.fromCharCode(f >> 6 | 192) : (c += String.fromCharCode(f >> 12 | 224),
            c += String.fromCharCode(f >> 6 & 63 | 128)),
            c += String.fromCharCode(f & 63 | 128))
        }
        return c
    }(c);
    k = function(a) {
        for (var c = a.length, e = c + 8, f = 16 * ((e - e % 64) / 64 + 1), k = Array(f - 1), l, n = 0; n < c; )
            e = (n - n % 4) / 4,
            l = n % 4 * 8,
            k[e] |= a.charCodeAt(n) << l,
            n++;
        k[(n - n % 4) / 4] |= 128 << n % 4 * 8;
        k[f - 2] = c << 3;
        k[f - 1] = c >>> 29;
        return k
    }(c);
    var u = 1732584193
      , n = 4023233417
      , r = 2562383102
      , l = 271733878;
    for (c = 0; c < k.length; c += 16) {
        var Bb = u
          , fb = n
          , Cb = r
          , Db = l;
        u = v(u, n, r, l, k[c + 0], 7, 3614090360);
        l = v(l, u, n, r, k[c + 1], 12, 3905402710);
        r = v(r, l, u, n, k[c + 2], 17, 606105819);
        n = v(n, r, l, u, k[c + 3], 22, 3250441966);
        u = v(u, n, r, l, k[c + 4], 7, 4118548399);
        l = v(l, u, n, r, k[c + 5], 12, 1200080426);
        r = v(r, l, u, n, k[c + 6], 17, 2821735955);
        n = v(n, r, l, u, k[c + 7], 22, 4249261313);
        u = v(u, n, r, l, k[c + 8], 7, 1770035416);
        l = v(l, u, n, r, k[c + 9], 12, 2336552879);
        r = v(r, l, u, n, k[c + 10], 17, 4294925233);
        n = v(n, r, l, u, k[c + 11], 22, 2304563134);
        u = v(u, n, r, l, k[c + 12], 7, 1804603682);
        l = v(l, u, n, r, k[c + 13], 12, 4254626195);
        r = v(r, l, u, n, k[c + 14], 17, 2792965006);
        n = v(n, r, l, u, k[c + 15], 22, 1236535329);
        u = p(u, n, r, l, k[c + 1], 5, 4129170786);
        l = p(l, u, n, r, k[c + 6], 9, 3225465664);
        r = p(r, l, u, n, k[c + 11], 14, 643717713);
        n = p(n, r, l, u, k[c + 0], 20, 3921069994);
        u = p(u, n, r, l, k[c + 5], 5, 3593408605);
        l = p(l, u, n, r, k[c + 10], 9, 38016083);
        r = p(r, l, u, n, k[c + 15], 14, 3634488961);
        n = p(n, r, l, u, k[c + 4], 20, 3889429448);
        u = p(u, n, r, l, k[c + 9], 5, 568446438);
        l = p(l, u, n, r, k[c + 14], 9, 3275163606);
        r = p(r, l, u, n, k[c + 3], 14, 4107603335);
        n = p(n, r, l, u, k[c + 8], 20, 1163531501);
        u = p(u, n, r, l, k[c + 13], 5, 2850285829);
        l = p(l, u, n, r, k[c + 2], 9, 4243563512);
        r = p(r, l, u, n, k[c + 7], 14, 1735328473);
        n = p(n, r, l, u, k[c + 12], 20, 2368359562);
        u = a(u, n, r, l, k[c + 5], 4, 4294588738);
        l = a(l, u, n, r, k[c + 8], 11, 2272392833);
        r = a(r, l, u, n, k[c + 11], 16, 1839030562);
        n = a(n, r, l, u, k[c + 14], 23, 4259657740);
        u = a(u, n, r, l, k[c + 1], 4, 2763975236);
        l = a(l, u, n, r, k[c + 4], 11, 1272893353);
        r = a(r, l, u, n, k[c + 7], 16, 4139469664);
        n = a(n, r, l, u, k[c + 10], 23, 3200236656);
        u = a(u, n, r, l, k[c + 13], 4, 681279174);
        l = a(l, u, n, r, k[c + 0], 11, 3936430074);
        r = a(r, l, u, n, k[c + 3], 16, 3572445317);
        n = a(n, r, l, u, k[c + 6], 23, 76029189);
        u = a(u, n, r, l, k[c + 9], 4, 3654602809);
        l = a(l, u, n, r, k[c + 12], 11, 3873151461);
        r = a(r, l, u, n, k[c + 15], 16, 530742520);
        n = a(n, r, l, u, k[c + 2], 23, 3299628645);
        u = e(u, n, r, l, k[c + 0], 6, 4096336452);
        l = e(l, u, n, r, k[c + 7], 10, 1126891415);
        r = e(r, l, u, n, k[c + 14], 15, 2878612391);
        n = e(n, r, l, u, k[c + 5], 21, 4237533241);
        u = e(u, n, r, l, k[c + 12], 6, 1700485571);
        l = e(l, u, n, r, k[c + 3], 10, 2399980690);
        r = e(r, l, u, n, k[c + 10], 15, 4293915773);
        n = e(n, r, l, u, k[c + 1], 21, 2240044497);
        u = e(u, n, r, l, k[c + 8], 6, 1873313359);
        l = e(l, u, n, r, k[c + 15], 10, 4264355552);
        r = e(r, l, u, n, k[c + 6], 15, 2734768916);
        n = e(n, r, l, u, k[c + 13], 21, 1309151649);
        u = e(u, n, r, l, k[c + 4], 6, 4149444226);
        l = e(l, u, n, r, k[c + 11], 10, 3174756917);
        r = e(r, l, u, n, k[c + 2], 15, 718787259);
        n = e(n, r, l, u, k[c + 9], 21, 3951481745);
        u = f(u, Bb);
        n = f(n, fb);
        r = f(r, Cb);
        l = f(l, Db)
    }
    return (W(u) + W(n) + W(r) + W(l)).toLowerCase()
};
window.dzsap_currplayer_focused = null;
window.dzsap_currplayer_from_share = null;
window.dzsap_mouseover = !1;
window.dzs_open_social_link = function(c, f) {
    var v = window.screen.width / 2 - 260;
    var p = window.screen.height / 2 - 300;
    v = "status=no,height=500,width=500,resizable=yes,left=" + v + ",top=" + p + ",screenX=" + v + ",screenY=" + p + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";
    console.log("dzs_open_social_link()", c, "argthis - ", f);
    c = c.replace("{{replacewithcurrurl}}", encodeURIComponent(window.location.href));
    f && (c = c.replace(/{{replacewithdataurl}}/g, f.attr("data-url")));
    p = window.location.href.split("?");
    var a = ""
      , e = "";
    !f && window.dzsap_currplayer_from_share && (f = window.dzsap_currplayer_from_share);
    if (f) {
        var W = jQuery;
        W(f).hasClass("audioplayer") ? (a = W(f).parent().children().index(f),
        e = W(f).parent().parent().parent().attr("id")) : (jQuery(f).parent().parent().attr("data-menu-index") && (a = jQuery(f).parent().parent().attr("data-menu-index")),
        jQuery(f).parent().parent().attr("data-gallery-id") && (e = jQuery(f).parent().parent().attr("data-gallery-id")))
    }
    f = encodeURIComponent(p[0] + "?fromsharer=on&audiogallery_startitem_" + e + "=" + a);
    c = c.replace("{{shareurl}}", f);
    console.log("shareurl -> ", f);
    window.open(c, "sharer", v)
}
;
function formatTime(c) {
    c = Math.round(c);
    var f = 0;
    if (0 < c) {
        for (; 59 < c; )
            f++,
            c -= 60;
        return String((10 > f ? "0" : "") + f + ":" + (10 > c ? "0" : "") + c)
    }
    return "00:00"
}
function dzsap_send_total_time(c, f) {
    c = {
        action: "dzsap_send_total_time_for_track",
        id_track: f.attr("data-playerid"),
        postdata: parseInt(c, 10)
    };
    jQuery.post(window.dzsap_ajaxurl, c, function(c) {
        void 0 != window.console && console.log("dzsap_send_total_time Got this from the server: " + c)
    })
}
function dzs_clean_string(c) {
    return c ? (c = c.replace(/[^A-Za-z0-9\-]/g, ""),
    c = c.replace(/\./g, "")) : ""
}
function get_query_arg(c, f) {
    if (-1 < c.indexOf(f + "=") && (c = (new RegExp("[?&]" + f + "=.+")).exec(c),
    null != c))
        return c = c[0],
        -1 < c.indexOf("&") && (c = c.split("&")[1]),
        c.split("=")[1]
}
function add_query_arg(c, f, v) {
    f = encodeURIComponent(f);
    v = encodeURIComponent(v);
    c || (c = "");
    var p = f + "=" + v;
    c = c.replace(new RegExp("(&|\\?)" + f + "=[^&]*"), "$1" + p);
    -1 < c.indexOf(f + "=") || (c = -1 < c.indexOf("?") ? c + ("&" + p) : c + ("?" + p));
    "NaN" == v && (c = c.replace(new RegExp("[?|&]" + f + "=" + v), ""),
    -1 == c.indexOf("?") && -1 < c.indexOf("&") && (c = c.replace("&", "?")));
    return c
}
function can_history_api() {
    return !(!window.history || !history.pushState)
}
window.dzsap_wp_send_contor_60_secs = function(c, f) {
    c = {
        video_title: f,
        video_analytics_id: c.attr("data-playerid"),
        curr_user: window.dzsap_curr_user
    };
    f = "index.php?action=ajax_dzsap_submit_contor_60_secs";
    window.dzsap_settings.dzsap_site_url && (f = dzsap_settings.dzsap_site_url + f);
    jQuery.ajax({
        type: "POST",
        url: f,
        data: c,
        success: function(c) {},
        error: function(c) {}
    })
}
;
function dzsap_call_init_calls() {
    for (var c in window.dzsap_init_calls)
        window.dzsap_init_calls[c](jQuery);
    window.dzsap_init_calls = []
}
window.dzsap_call_init_calls = dzsap_call_init_calls;
if (window.jQuery)
    register_dzsap_plugin(),
    register_dzsap_aux_script(),
    jQuery(document).ready(function(c) {
        dzsap_call_init_calls()
    });
else {
    var script = document.createElement("script");
    document.head.appendChild(script);
    script.type = "text/javascript";
    script.src = "//ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js";
    script.onload = function() {
        register_dzsap_plugin();
        register_dzsap_aux_script();
        dzsap_call_init_calls()
    }
}
window.dzsap_init = function(c, f) {
    if ("undefined" != typeof f && "undefined" != typeof f.init_each && 1 == f.init_each) {
        var v = 0, p;
        for (p in f)
            v++;
        1 == v && (f = void 0);
        jQuery(c).each(function() {
            var a = jQuery(this);
            f && "undefined" == typeof f.call_from && (f.call_from = "dzsap_init");
            a.audioplayer(f)
        })
    } else
        jQuery(c).audioplayer(f);
    dzsap_lasto = f;
    window.dzsap_generate_list_for_sync_players = function(a) {
        var c = {
            force_regenerate: !1
        };
        a && (c = $.extend(c, a));
        window.dzsap_list_for_sync_players = [];
        "undefined" != typeof f && ("undefined" != typeof f.construct_player_list_for_sync && "on" == f.construct_player_list_for_sync || c.force_regenerate) && jQuery(".audioplayer,.audioplayer-tobe").each(function() {
            var a = jQuery(this);
            "on" != a.attr("data-do-not-include-in-list") && ("fake" != a.attr("data-type") || a.attr("data-fakeplayer")) && window.dzsap_list_for_sync_players.push(a)
        })
    }
    ;
    jQuery(document).off("click.dzsap_global");
    jQuery(document).on("click.dzsap_global", ".dzsap-btn-info", function() {
        var a = jQuery(this);
        a.hasClass("dzsap-btn-info") && a.find(".dzstooltip").toggleClass("active")
    });
    jQuery(document).on("mouseover.dzsap_global", ".dzsap-btn-info", function() {
        var a = jQuery(this);
        a.hasClass("dzsap-btn-info") && (500 > window.innerWidth ? a.offset().left < window.innerWidth / 2 && a.find(".dzstooltip").removeClass("talign-end").addClass("talign-start") : a.find(".dzstooltip").addClass("talign-end").removeClass("talign-start"))
    })
}
;
window.dzsap_init_multisharer = function() {
    var c = jQuery;
    setTimeout(function() {
        if (!window.dzsap_multisharer_assets_loaded && 1 != window.dzsap_multisharer_assets_loaded && 1 != window.loading_multi_sharer) {
            window.loading_multi_sharer = !0;
            var f = document.getElementsByTagName("head")[0]
              , v = document.createElement("link");
            v.id = "dzsap-load-multi-sharer";
            v.rel = "stylesheet";
            v.type = "text/css";
            v.href = add_query_arg(window.dzsap_settings.dzsap_site_url, "load-lightbox-css", "on");
            v.media = "all";
            f.appendChild(v);
            setTimeout(function() {
                null == window.dzsap_box_main_con && (c("body").append('<div class="dzsap-main-con skin-default gallery-skin-default transition-slideup "> <div class="overlay-background"></div> <div class="box-mains-con"> <div class="box-main box-main-for-share" style=""> <div class="box-main-media-con transition-target"> <div class="close-btn-con"> <svg enable-background="new 0 0 40 40" id="" version="1.1" viewBox="0 0 40 40" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M28.1,26.8c0.4,0.4,0.4,1,0,1.4c-0.2,0.2-0.5,0.3-0.7,0.3s-0.5-0.1-0.7-0.3l-6.8-6.8l-6.8,6.8c-0.2,0.2-0.5,0.3-0.7,0.3 s-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l6.8-6.8l-6.8-6.8c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l6.8,6.8l6.8-6.8 c0.4-0.4,1-0.4,1.4,0c0.4,0.4,0.4,1,0,1.4L21.3,20L28.1,26.8z"></path></g><g><path d="M19.9,40c-11,0-20-9-20-20s9-20,20-20c4.5,0,8.7,1.5,12.3,4.2c0.4,0.3,0.5,1,0.2,1.4c-0.3,0.4-1,0.5-1.4,0.2 c-3.2-2.5-7-3.8-11-3.8c-9.9,0-18,8.1-18,18s8.1,18,18,18s18-8.1,18-18c0-3.2-0.9-6.4-2.5-9.2c-0.3-0.5-0.1-1.1,0.3-1.4 c0.5-0.3,1.1-0.1,1.4,0.3c1.8,3.1,2.8,6.6,2.8,10.2C39.9,31,30.9,40,19.9,40z"></path></g></svg></div> <div class="box-main-media type-inlinecontent" style="width: 530px; height: 280px;"><div class=" real-media" style=""><div class="hidden-content share-content" > <div class="social-networks-con"></div> <div class="share-link-con"></div> <div class="embed-link-con"></div> </div> </div> </div> <div class="box-main-under"></div> </div> </div> </div>\x3c!-- end .box-mains-con--\x3e </div>'),
                window.dzsap_box_main_con = c(".dzsap-main-con").eq(0))
            }, 1E3)
        }
        c(document).on("click.dzsap_global_sharer", ".dzsap-main-con .close-btn-con,.dzsap-main-con .overlay-background", function() {
            c(".dzsap-main-con").eq(0).removeClass("loading-item loaded-item")
        })
    }, 2E3)
}
;
