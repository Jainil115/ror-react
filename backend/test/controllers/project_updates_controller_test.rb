require "test_helper"

class ProjectUpdatesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @project_update = project_updates(:one)
  end

  test "should get index" do
    get project_updates_url, as: :json
    assert_response :success
  end

  test "should create project_update" do
    assert_difference("ProjectUpdate.count") do
      post project_updates_url, params: { project_update: { date: @project_update.date, general_updates: @project_update.general_updates, project_id: @project_update.project_id } }, as: :json
    end

    assert_response :created
  end

  test "should show project_update" do
    get project_update_url(@project_update), as: :json
    assert_response :success
  end

  test "should update project_update" do
    patch project_update_url(@project_update), params: { project_update: { date: @project_update.date, general_updates: @project_update.general_updates, project_id: @project_update.project_id } }, as: :json
    assert_response :success
  end

  test "should destroy project_update" do
    assert_difference("ProjectUpdate.count", -1) do
      delete project_update_url(@project_update), as: :json
    end

    assert_response :no_content
  end
end
