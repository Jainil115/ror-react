require "test_helper"

class ResourcesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @resource = resources(:one)
  end

  test "should get index" do
    get resources_url, as: :json
    assert_response :success
  end

  test "should create resource" do
    assert_difference("Resource.count") do
      post resources_url, params: { resource: { comment: @resource.comment, end_date: @resource.end_date, project_id: @resource.project_id, resource_name: @resource.resource_name, role: @resource.role, start_date: @resource.start_date } }, as: :json
    end

    assert_response :created
  end

  test "should show resource" do
    get resource_url(@resource), as: :json
    assert_response :success
  end

  test "should update resource" do
    patch resource_url(@resource), params: { resource: { comment: @resource.comment, end_date: @resource.end_date, project_id: @resource.project_id, resource_name: @resource.resource_name, role: @resource.role, start_date: @resource.start_date } }, as: :json
    assert_response :success
  end

  test "should destroy resource" do
    assert_difference("Resource.count", -1) do
      delete resource_url(@resource), as: :json
    end

    assert_response :no_content
  end
end
