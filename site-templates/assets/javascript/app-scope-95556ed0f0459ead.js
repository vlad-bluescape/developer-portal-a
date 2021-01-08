/**
 * Get Permission groups from API
 * resource_type [organization, workspace]
 * @returns {{}|*}
 */
function getPermissionGroups() {
    return JSON.parse($.ajax({
      url: '/others/permission_groups.json',
      async: false,
      dataType: 'json',
      success: function (data) {
        return data;
      }
    }).responseText);
  }
  
  
  /**
   * return permission group names to given id's
   * @param value
   * @returns {string}
   */
  function getPermissionGroupNames(value) {
    value = value.split(',');
    const { user_scope, organization_scope } = getPermissionGroups();
    const permissionGroups = user_scope.concat(organization_scope);
    const pGroups = {};
    $.map(permissionGroups, function (e) {
      pGroups[e['key']] = e['name'];
    });
    return $.map(value, function (e) {
      return '<div class="col-md-12">' +
        '<i class="glyphicon glyphicon-ok text-success" /> &nbsp;&nbsp;&nbsp;<label class="checkbox-inline ">' +
        pGroups[e] + '</label></div>';
    }).join('');
  }
  
  /**
   * get and set the user and organization scope
   * ie. permission group id's selected by the user.
   * @param id
   */
  function bind_app_scope(id) {
    $("form" + id).on("submit", function () {
      const _orgScope =
        $("#org_scope").find(".permission_group:checked").map(function () {
          return this.value;
        }).get().join(',');
      $('#application_org_scope').val(_orgScope);
      const _userScope =
        $("#user_scope").find(".permission_group:checked").map(function () {
          return this.value;
        }).get().join(',');
      $('#application_user_scope').val(_userScope);
      return true;
    });
  }
  
  
  