var page

function updateDashboard(user) {
  const userId = readCookie("access-token")
  $.ajax({
    type: 'GET',
    url: 'https://dcbhack.azurewebsites.net/users?userId=' + userId,
    success: function (response) {
      updateUserDashboard(response["user"])
    },
    error: function (response) {
      alert('An error occurred.');
      updateUserDashboard({})
    }
  });
}

function updateUserDashboard(user) {
  page = loadPage("/pages/dashboard.html")
  $("#screen").html(page)
  if (isNaN(user["rating"])) {
    $("#rating").text(Math.random() * 5)
  }
}

function acceptProposal(userId, proposalId) {
  $.ajax({
    type: 'GET',
    url: 'https://dcbhack.azurewebsites.net/loan-proposals/accept?userId=' + userId + '&proposalId=' + proposalId,
    success: function (response) {
      alert('Successfully accepted proposal');
      location.reload()
    },
    error: function (response) {
      alert('An error occurred.');
      location.reload()
    }
  });
}

function showLenderInfo(lenderInfo) {
  alert("hi")
}