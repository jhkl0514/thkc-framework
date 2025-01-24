$(function () {
  // ------------------------------------- mobile -------------------------------------

  // 정렬 숨기기/보여주기
  $(".listTop .tabTop span")
    .eq(0)
    .on("click", function () {
      $(".editBtnWrap").show();
    });
  $(".listTop .tabTop span")
    .eq(1)
    .on("click", function () {
      $(".editBtnWrap").hide();
      $(".editBtnWrap").removeClass("on");
      $(".mapList .tabCon > ul").removeClass("editSort");
      $(".timeSort").removeClass("on");
    });

  // sortable
  $(".mapChange").mouseover(function () {
    $(".timeSort").removeClass("on");
  });

  $(".mapChange").mouseout(function () {
    $(".timeSort").addClass("on");
  });

  //editBtn 클릭시
  $(".editBtnWrap .editBtn").on("click", function () {
    $(".editBtnWrap").addClass("on");
    $(".mapList .tabCon > ul").addClass("editSort");
    $(".timeSort").addClass("on");
  });

  //confBtn 클릭시
  $(".editBtnWrap .confBtn").on("click", function () {
    $(".editBtnWrap").removeClass("on");
    $(".mapList .tabCon > ul").removeClass("editSort");
    $(".timeSort").removeClass("on");
  });

  //mapShowBtn
  $(".mapShowBtn").on("click", function () {
    $("header").toggleClass("active");
    $(".mobile_partner_wrap").toggleClass("active");
  });

  //배정하기
  $(".returnList li:not('#noimg')").click(function () {
    $(".DDY_modal02").addClass("active");
  });

  //hambar
  $(".hambar").click(function () {
    $(".mobile_navi").addClass("active");
  });
  $(".mobile_navi .h_right").click(function () {
    $(".mobile_navi").removeClass("active");
    $(".hambar").removeClass("on");
  });

  //li on reset
  // $(".mapWrap").click(function () {
  //   $("#sortable li").removeClass("on");
  // });
  $(".mapWrap").on("click", function (e) {
    if ($(e.target).find(".localPoint").length !== 0) {
      $("#sortable li").removeClass("on");
    }
  });

  //localpoint 누르면 해당 텍스트 비교후 on붙이기
  $(".localPoint").click(function (e) {
    const clickedElement = $(e.target);
    const clickedText = clickedElement.text();

    const isInstall = clickedElement.closest(".local_install").length > 0;
    const isReturn = clickedElement.closest(".local_return").length > 0;

    $("#sortable li").removeClass("on");

    $("#sortable li").each(function () {
      if (isInstall) {
        if ($(this).hasClass("install")) {
          const mapNumText = $(this).find(".mapNum").text();
          if (clickedText === mapNumText) {
            $(this).addClass("on");
          }
        }
      } else if (isReturn) {
        if ($(this).hasClass("return")) {
          const mapNumText = $(this).find(".mapNum").text();
          if (clickedText === mapNumText) {
            $(this).addClass("on");
          }
        }
      }
    });
  });

  // timepicker
  $(".dateTime div ol li button").click(function () {
    $(this).parent().addClass("active").siblings().removeClass("active");
    const position = $(this).position().top;
    const btnHeight = $(this).height();
    const olElement = $(this).parent().parent("ol");
    olElement.css({ top: -position });

    const parentLevel = $(this).parent().parent().parent().index();
    const targetSelect = $(this)
      .parents(".DDY_mobile_modal02.active")
      .prev(".DDY_select")
      .find(".select button");

    if (parentLevel === 0) {
      targetSelect.find(".span01").text($(this).text());
    } else if (parentLevel === 1) {
      targetSelect.find(".span02").text($(this).text());
    } else if (parentLevel === 3) {
      targetSelect.find(".span03").text($(this).text()).addClass("on");
    }
  });

  // DDY modal
  $(".modalWrap").click(function (e) {
    e.stopPropagation();
  });
  $(".DDY_mobile_modal").click(function () {
    $(this).removeClass("active");
    $("html, body").removeClass("hidden");
  });
  $(".closeBtn").click(function () {
    $(".DDY_mobile_modal").removeClass("active");
    $("html, body").removeClass("hidden");
  });

  //modal button
  $(
    ".DDY_mobile_modal03 .option button, .DDY_mobile_modal04 .option button"
  ).click(function () {
    var text = $(this).text();

    $(this)
      .parents(".DDY_mobile_modal.active")
      .prev(".DDY_select")
      .find(".select button")
      .text(text);

    $(".option").removeClass("active");

    $(this)
      .parents(".DDY_mobile_modal.active")
      .prev(".DDY_select")
      .find(".select")
      .removeClass("active");

    $(this)
      .parents(".DDY_mobile_modal.active")
      .prev(".DDY_select")
      .find(".select")
      .addClass("font_c");
    $("li").removeClass("checked");
    $(this).parent("li").addClass("checked");
  });

  $(".DDY_mobile_modal02 .option button").click(function () {
    $(this)
      .parents(".DDY_mobile_modal02.active")
      .prev(".DDY_select")
      .find(".select")
      .addClass("font_c");
  });
});
