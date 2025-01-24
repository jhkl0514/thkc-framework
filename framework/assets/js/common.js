$(document).ready(function () {
  // ------------------------------------- loading -------------------------------------
  //loading
  setTimeout(function () {
    $(".loading_wrap").removeClass("on");
  }, 500);

  // ------------------------------------- tab -------------------------------------
  // common tab
  $(".tabCon").hide();
  $(".tabCon").eq(0).show(0);
  $(".tabTop span").on("click", function () {
    const idx = $(this).index();
    $(".tabTop span").removeClass("active");
    $(this).addClass("active");
    $(".tabCon").hide();
    $(".tabCon").eq(idx).show();

    //tabTop span 클릭시 tableCon 조정 09_DDYlist
    $(".tabCon").children(".tableTabTop").find("span").removeClass("active");
    $(".tabCon")
      .eq(idx)
      .children(".tableTabTop")
      .find("span")
      .eq(0)
      .addClass("active");

    $(".tabCon").eq(idx).children(".tableCon").hide();
    $(".tabCon").eq(idx).children(".tableCon").eq(0).show();

    //searchBox
    $(".searchBox").removeClass("active");
  });

  // tableTabTop
  $(".tableCon").hide();
  $(".tableCon").eq(0).show(0);
  $(".tableTabTop span").on("click", function () {
    const idx = $(this).index();

    //tableTabTop span
    $(this).siblings("span").removeClass("active");
    $(this).addClass("active");

    //tableCon
    $(".tableCon").hide();
    $(".tableCon").eq(idx).show(0);
    $(this).parent().siblings(".tableCon").eq(idx).show();

    //table shadow
    $(".divideTable table").removeClass("shadow");
    $(".divideTable .DDY_checkBox input").prop("checked", false);

    //추가
    //tableDiv scrollLeft 0
    $(".tableDiv").scrollLeft(0);
  });

  // rental tab
  $(".rental_tabTop span").hide();
  $(".rental_tabTop span").eq(0).show(0);
  $(".tabItem").on("click", function () {
    const idx = $(this).index();
    $(".tabItem").removeClass("active");
    $(this).addClass("active");
    $(".rental_tabTop span").hide();
    $(".rental_tabTop span").eq(idx).show();
  });

  // labelTab
  $(".labelTab li").on("click", function () {
    $(".labelTab li").removeClass("on");
    $(this).addClass("on");
  });

  // ------------------------------------- tooltip -------------------------------------

  $(".tipIcon a").on("click", function () {
    $(".tooltipWrap").removeClass("on");
    $(this).next(".tooltipWrap").addClass("on");
  });
  $(".closeBtn").on("click", function () {
    $(".tooltipWrap").removeClass("on");
  });

  //영역밖 클릭시 remove
  $(document).on("click", function (e) {
    if ($(e.target).closest(".tipIcon").length > 0) {
      return;
    }

    $(".tooltipWrap").removeClass("on");
  });

  // ------------------------------------- select -------------------------------------

  //selectBox jquery
  $(".DDY_select .select").on("click", function () {
    const option = $(this).siblings(".option");
    $(this).toggleClass("active");
    option.toggleClass("active");
    if ($(this).hasClass("disable")) {
      $(this).removeClass("active");
      option.removeClass("active");
    }
    if ($(".DDY_select .select").not(this).hasClass("active")) {
      $(".DDY_select .select")
        .not(this)
        .removeClass("active")
        .siblings(".option")
        .removeClass("active");
    }
  });

  //option 클릭시 remove
  $(".option button").on("click", function () {
    const text = $(this).text();
    $(this).closest(".DDY_select").find(".select button").text(text);
    $(this).closest(".option").removeClass("active");
    $(".DDY_select .select").removeClass("active");
    $(this).closest(".DDY_select").find(".select").addClass("font_c");
    $(this).closest(".DDY_select").find(".select").removeClass("error");
    if ($(this).parent().hasClass("disable")) {
      $(this)
        .closest(".DDY_select")
        .find(".select")
        .removeClass("font_c")
        .find("button")
        .text("전체");
    }
  });

  //영역밖 클릭시 remove
  $(document).on("click", function (e) {
    if ($(e.target).closest(".DDY_select").length > 0) {
      return;
    }
    $(".DDY_select .option").removeClass("active");
    $(".DDY_select .select").removeClass("active");
  });

  $(".infoOption").hide();
  // 설치옵션
  $(".option ul li").on("click", function () {
    const getText = $(this).find("button").text();

    $(this)
      .parent()
      .parent()
      .parent()
      .next(".infoOption")
      .find("ul")
      .append(
        `<li><p>` +
          getText +
          ` <span>30,000원</span></p><a href="javascript:void(0)"><img src="/framework/assets/images/close_icon.svg" alt="닫기"></a></li>`
      );
    //infoOption 추가
    const len = $(".infoOption ul li").length;
    if (len > 0) {
      $(".infoOption").show();
    }
  });

  //infoOption 삭제
  $(document).on("click", ".infoOption ul li a", function () {
    $(this).parent().remove();
    const len = $(".infoOption ul li").length;
    if (len === 0) {
      $(".infoOption").hide();
    }
  });

  // ------------------------------------- modal -------------------------------------

  // 240618 수정
  // 모달창에서 모달영역클릭시 remove
  $(".modal_bg").on("click", function (e) {
    $(".DDY_select .option").removeClass("active");
    $(".DDY_select .select").removeClass("active");
    $(".DDY_modal").removeClass("active");
    $("html, body").removeClass("hidden");
  });

  $(".closeBtn").on("click", function () {
    $(".DDY_modal").removeClass("active");
    $("html, body").removeClass("hidden");
    $(".DDY_select .select").removeClass("active");
  });

  // ------------------------------------- button -------------------------------------

  // 변경하기 버튼
  $(".reviseAll").on("click", function () {
    $(this).hide();
    $(".orderWrap .view").addClass("hidden");
    $(".orderWrap .edit").removeClass("hidden");
    $(".orderWrap .edit").addClass("show");
    $(".btnWrap button").hide();
    $(".lastBtnWrap button").hide();
    $(".edit_save").show();
  });
  $(".edit_save").on("click", function () {
    $(".reviseAll").show();
    $(".orderWrap .view").removeClass("hidden");
    $(".orderWrap .edit").removeClass("show");
    $(".orderWrap .edit").addClass("hidden");
    $(".btnWrap button").show();
    $(".lastBtnWrap button").show();
    $(this).hide();
  });

  // ------------------------------------- table -------------------------------------

  // table scroll
  // 모달 preview_list scroll
  var scrTbl, scrTblLeft, scrTblDown;
  $(".tableDiv , .modalContent .preview_list, #preview_list")
    .on("mouseenter", function () {
      $(this).on({
        mousedown: function (e) {
          e.preventDefault();
          scrTblDown = true;
          scrTbl = e.pageX;
          scrTblLeft = $(this).scrollLeft();
        },
        mousemove: function (e) {
          if (scrTblDown) {
            const newX = e.pageX;
            $(this).scrollLeft(scrTblLeft - newX + scrTbl);
          }
        },
        mouseup: function (e) {
          scrTblDown = false;
        },
      });
    })
    .on("mouseleave", function () {
      $(this).off("mousedown mousemove mouseup");
      scrTbl = null;
      scrTblLeft = null;
      scrTblDown = false;
    });

  //tableDiv shadow
  const container = $(".tableDiv");
  const containerScroll = $(".divideTable table");

  container.on("scroll", function () {
    if (this.scrollLeft == 0) {
      containerScroll.removeClass("shadow");
    } else {
      containerScroll.addClass("shadow");
    }
  });

  //table tr hover
  // const divideTable = $(".divideTable > table > tbody > tr");
  // const tableDiv = $(".tableDiv > table > tbody > tr");

  // $(divideTable).hover(function () {
  //   const index = $(this).index();
  //   $(this).toggleClass("hover");
  //   $(this)
  //     .parent()
  //     .parent()
  //     .next()
  //     .find("table > tbody > tr")
  //     .eq(index)
  //     .toggleClass("hover");
  // });

  // $(tableDiv).hover(function () {
  //   const index = $(this).index();
  //   $(this).toggleClass("hover");
  //   $(this)
  //     .parent()
  //     .parent()
  //     .parent()
  //     .parent()
  //     .find("table > tbody > tr")
  //     .eq(index)
  //     .toggleClass("hover");
  // });

  //table sort motion
  $(".table_sort").on("click", function () {
    const sort = $(this).hasClass("asc") ? "desc" : "asc";
    $(this).removeClass("asc desc");
    $(this).addClass(sort);
  });

  //table delete
  $(".table_delete").on("click", function () {
    $(this).parent().hide();
  });

  // 동적
  //table tr hover
  //mouseenter
  $(document).on(
    "mouseenter",
    ".divideTable > table > tbody > tr",
    function () {
      const index = $(this).index();
      //$(this) hover
      $(this).toggleClass("hover");

      //tableDiv tr hover
      $(this)
        .parents("table")
        .next()
        .find("table > tbody > tr")
        .eq(index)
        .toggleClass("hover");
    }
  );
  //mouseleave
  // $(document).on(
  //   "mouseleave",
  //   ".divideTable > table > tbody > tr",
  //   function () {
  //     const index = $(this).index();
  //     //$(this) hover
  //     $(this).toggleClass("hover");

  //     //tableDiv tr hover
  //     $(this)
  //       .parents("table")
  //       .next()
  //       .find("table > tbody > tr")
  //       .eq(index)
  //       .toggleClass("hover");
  //   }
  // );
  //mouseenter
  $(document).on("mouseenter", ".tableDiv > table > tbody > tr", function () {
    const index = $(this).index();
    //$(this) hover
    $(this).toggleClass("hover");

    //dividetable tr hover
    $(this)
      .parents(".divideTable ")
      .find("table > tbody > tr")
      .eq(index)
      .toggleClass("hover");
  });
  //mouseleave
  // $(document).on("mouseleave", ".tableDiv > table > tbody > tr", function () {
  //   const index = $(this).index();
  //   //$(this) hover
  //   $(this).toggleClass("hover");

  //   //dividetable tr hover
  //   $(this)
  //     .parents(".divideTable ")
  //     .find("table > tbody > tr")
  //     .eq(index)
  //     .toggleClass("hover");
  // });

  // 요약정리
  $(document).on(
    "mouseleave",
    ".divideTable > table > tbody > tr,.tableDiv > table > tbody > tr",
    function () {
      const index = $(this).index();
      $(
        ".divideTable > table > tbody > tr, .tableDiv > table > tbody > tr"
      ).removeClass("hover");
      $(
        `.divideTable > table > tbody > tr:eq(` + index + `)`,
        `.tableDiv > table > tbody > tr:eq(` + index + `)`
      ).removeClass("hover");
    }
  );

  //마우스 가로 스크롤
  // $(document).on("mouseenter wheel", ".tableDiv, .preview_list", function (e) {
  //   e.preventDefault();
  //   const wheel = e.originalEvent.wheelDelta;
  //   const newScroll = -wheel + $(this).scrollLeft();

  //   $("body, html, main").addClass("hidden");
  //   $(this).stop().animate(
  //     {
  //       scrollLeft: newScroll,
  //     },
  //     300
  //   );
  //   return false;
  // });

  // $(document).on("mouseleave", ".tableDiv, .preview_list", function () {
  //   $("body, html, main").removeClass("hidden");
  // });

  // -------------------------------------  hambar  -------------------------------------

  //hambar
  $(".hambar").on("click", function () {
    $(this).toggleClass("on");
    $("nav").toggleClass("on");
    $("main").toggleClass("on");
  });

  // -------------------------------------  nav  -------------------------------------

  // nav
  $("nav > ul > li > a").on("click", function () {
    $(this).next("ul").stop().slideToggle();
    $(this).parent("li").toggleClass("on");
  });

  $("nav > ul > li > ul > li > a").on("click", function () {
    $(this).next("ul").stop().slideToggle();
    $(this).parent("li").toggleClass("on");
  });

  // -------------------------------------  userimg  -------------------------------------

  //userimg
  $(".userWrap > .imgWrap").on("click", function () {
    $(".userInfo").toggleClass("active");
  });

  // -------------------------------------  window  -------------------------------------

  //1440 이하로 화면줄어들때 nav,main,hambar 변경
  $(window).resize(function () {
    let windowWidth = $(window).width();
    if (windowWidth < 1439) {
      $("nav, main, .hambar ").removeClass("on");
    }
  });

  // ------------------------------------- 접기 버튼 -------------------------------------

  //sideFoldBtn 접기버튼
  $(".sideFoldBtn").on("click", function () {
    $(".mapListWrap, .mapView").toggleClass("active");
  });

  //searchBox foldBtn 접기버튼
  $(".foldBtn").on("click", function () {
    $(".searchBox").toggleClass("active");
  });

  // ------------------------------------- DDY_chips -------------------------------------

  //공통 라벨
  $(".DDY_chips li").on("click", function () {
    $(this).toggleClass("active");
    if ($(this).hasClass("disable")) {
      $(this).removeClass("active");
    }
  });

  //창고 모달 라벨
  $(".barcode_modal_list .DDY_chips li").on("click", function () {
    $(this).addClass("active");
  });

  // ------------------------------------- input -------------------------------------

  //파일 업로드 용량 제한
  $("input[type=file]").on("change", function (e) {
    if (!$(this).val()) return;
    const f = this.files[0];
    const size = f.size || f.fileSize;
    const limit = 20000000;

    if (size > limit) {
      alert("파일용량은 20mb 를 넘을수 없습니다.");
      $(this).val("");
      return;
    }
    $(this).parent().find("input[type=text]").val($(this).val());
  });

  // ------------------------------------- textarea -------------------------------------

  //textarea 글자수 제한
  $(".textarea").keyup(function (e) {
    let content = $(this).val();
    if (content.length == 0 || content == "") {
      $(this).parent().parent().find(".textarea_wrap").addClass("error");
      $(this).parent().find(".textLengthWrap").removeClass("on");
      $(this).parent().find(".textLengthWrap").children(".textCount").text("0");
    } else {
      $(this).parent().parent().find(".textarea_wrap").removeClass("error");
      $(this).parent().find(".textLengthWrap").addClass("on");
      $(this)
        .parent()
        .find(".textLengthWrap")
        .children(".textCount")
        .text(content.length);
    }

    if (content.length > 200) {
      $(this).val($(this).val().substring(0, 200));
      alert("글자수는 200자까지 입력 가능합니다.");
    }
  });

  // ------------------------------------- partner js -------------------------------------

  // localPoint 클릭시 다른 localpoint remove / this add
  $(".localPoint .imgWrap, .localPoint em").on("click", function () {
    $(".localPoint .imgWrap").removeClass("active");
    $(".localPoint em").removeClass("active");
    $(".partner_map_modal").removeClass("active");
    $(this).addClass("active");
    $(this).siblings(".partner_map_modal").addClass("active");
  });

  //x표시 클릭시 remove
  $(".closeBtn").on("click", function () {
    $(".partner_map_modal").removeClass("active");
    $("html, body").removeClass("hidden");
    $(".localPoint .imgWrap, .localPoint em").removeClass("active");
  });

  //상세보기 클릭시 remove
  $(".viewInfo, .modalBtnWrap button").on("click", function () {
    $(".partner_map_modal").removeClass("active");
    $("html, body").removeClass("hidden");
    $(".localPoint .imgWrap").removeClass("active");
    $(".localPoint em").removeClass("active");
  });

  //지도클릭시 remove
  $(".mapWrap").on("click", function (e) {
    if ($(e.target).find(".localPoint").length !== 0) {
      $(".partner_map_modal").removeClass("active");
      $("html, body").removeClass("hidden");
      $(".localPoint .imgWrap").removeClass("active");
      $(".localPoint em").removeClass("active");
    }
  });

  //달력 title 클릭시 show
  $(".localPoint .tui-calendar-title").on("click", function () {
    $(this).parents(".partner_map_modal").addClass("active");
  });

  // ------------------------------------- toggleWrap -------------------------------------

  //toggleWrap
  $(".tableTabTopcustom").each(function () {
    const findSpan = $(this).find("span.active");
    const spanWidth = $(findSpan).innerWidth();
    const spanoffset = $(findSpan).position().left;
    $(this).find(".bar").css({ width: spanWidth, left: spanoffset });
    $(this)
      .find("span")
      .on("click", function () {
        const spanWidth = $(this).innerWidth();
        const spanoffset = $(this).position().left;
        $(".tableTabTopcustom span").removeClass("on");
        $(this).parent(".tableTabTopcustom").find("span").removeClass("active");
        $(this)
          .parent()
          .find(".bar")
          .css({ width: spanWidth, left: spanoffset });
        $(this).addClass("active");
      });
  });

  //주문일 tui-datepicker-input
  $(".tui-datepicker-input").on("click", function () {
    $(".labelTab li").removeClass("on");
  });
  // ------------------------------------- DDY_checkBox -------------------------------------
  // DDY_checkBox
  $(".searchWrap .DDY_checkBox.checkAll").click(function () {
    var isChecked = $(this).find("input").is(":checked");
    $(this)
      .closest(".searchWrap")
      .find(".DDY_checkBox:not(.checkAll) input")
      .prop("checked", isChecked);
  });

  $(".searchWrap .DDY_checkBox:not(.checkAll) input").click(function () {
    var container = $(this).closest(".searchWrap");
    var allChecked =
      container.find(".DDY_checkBox:not(.checkAll) input").length ===
      container.find(".DDY_checkBox:not(.checkAll) input:checked").length;
    container.find(".DDY_checkBox.checkAll input").prop("checked", allChecked);
  });

  // ------------------------------------- addRack -------------------------------------
  //addRack
  $(".addRack").on("click", function () {
    const data = $(this)
      .parent()
      .parent()
      .siblings(".dataTable")
      .find("tbody")
      .children("tr.add")
      .html();
    $(this)
      .parent()
      .parent()
      .siblings(".dataTable")
      .find("tbody")
      .append(`<tr class="add">` + data + `</tr>`);

    //selectBox jquery
    $(".DDY_select").on("click", ".select", function () {
      const option = $(this).siblings(".option");
      $(this).addClass("active");
      option.addClass("active");
      if ($(this).hasClass("disable")) {
        $(this).removeClass("active");
        option.removeClass("active");
      }
      if ($(".DDY_select .select").not(this).hasClass("active")) {
        $(".DDY_select .select")
          .not(this)
          .removeClass("active")
          .siblings(".option")
          .removeClass("active");
      }
    });

    //option 클릭시 remove
    $(".option").on("click", "button", function () {
      const text = $(this).text();
      $(this).closest(".DDY_select").find(".select button").text(text);
      $(this).closest(".option").removeClass("active");
      $(".DDY_select .select").removeClass("active");
      $(this).closest(".DDY_select").find(".select").addClass("font_c");
      $(this).closest(".DDY_select").find(".select").removeClass("error");
      if ($(this).parent().hasClass("disable")) {
        $(this)
          .closest(".DDY_select")
          .find(".select")
          .removeClass("font_c")
          .find("button")
          .text("전체");
      }
    });
  });

  // ------------------------------------- thead .DDY_checkBox -------------------------------------
  // 전체선택
  $("thead .DDY_checkBox").click(function () {
    if ($("#checkAll").is(":checked")) {
      $("table .DDY_checkBox input").prop("checked", true);
      $("tr").addClass("on");
    } else {
      $("table .DDY_checkBox input").prop("checked", false);
      $("tr").removeClass("on");
    }
  });

  // ----------------------------- accordion ------------------------------------
  //accordionBox
  $(".accordionBox_title").click(function () {
    $(this).parent("li").toggleClass("on");
  });

  // ----------------------------- guide code ------------------------------------
  // 코드보기
  $(".code").click(function () {
    $(this).toggleClass("on");
    $(this).parent().children(".guide_tab_wrap").toggleClass("on");

    $(this).siblings(".guide_tab_wrap ").children(".guide_item").hide();
    $(this).siblings(".guide_tab_wrap ").children(".guide_item").eq(0).show(0);

    $(this)
      .parent()
      .children(".guide_tab_wrap")
      .children(".guide_tabTop")
      .children("span")
      .removeClass("active");

    $(this)
      .parent()
      .children(".guide_tab_wrap")
      .children(".guide_tabTop")
      .children("span")
      .eq(0)
      .addClass("active");

    $(this)
      .parent()
      .children(".guide_tab_wrap")
      .children(".guide_tabTop")
      .children("span")
      .click(function () {
        var idx = $(this).index();
        $(this).parent(".guide_tabTop").children("span").removeClass("active");
        $(this).addClass("active");
        $(this).parent().siblings(".guide_item").hide();
        $(this).parent().siblings(".guide_item").eq(idx).show();
      });
  });

  // ----------------------------- DDY_input ------------------------------------
  // DDY_input
  //전체삭제 버튼
  $(".DDY_input button").on("click", function () {
    $(this).parent().find("input").val("");
  });

  //guide 검색기능
  $("#guide_keyword").keyup(function () {
    const k = $(this).val().toLowerCase();
    if (k === "") {
      $("nav ul li").show();
    } else {
      $("nav ul").hide();

      const findK = $("nav a").filter(function () {
        return $(this).text().toLowerCase().includes(k);
      });

      if (findK.length === 0) {
        $("nav ul, nav li.on, nav ul li ul").show();
      } else {
        findK.each(function () {
          $("nav > ul > li").removeClass("on");
          $("nav > ul > li > ul > li").addClass("on");
          $(this).parentsUntil("nav", "ul, li").removeClass("on").show();
          $(this).parents("nav > ul > li").addClass("on");
        });
      }
    }
  });
});
