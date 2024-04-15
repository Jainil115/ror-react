require "test_helper"

class ApprovedTeamsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @approved_team = approved_teams(:one)
  end

  test "should get index" do
    get approved_teams_url, as: :json
    assert_response :success
  end

  test "should create approved_team" do
    assert_difference("ApprovedTeam.count") do
      post approved_teams_url, params: { approved_team: { availability_percentage: @approved_team.availability_percentage, duration: @approved_team.duration, number_of_resources: @approved_team.number_of_resources, project_id: @approved_team.project_id, role: @approved_team.role } }, as: :json
    end

    assert_response :created
  end

  test "should show approved_team" do
    get approved_team_url(@approved_team), as: :json
    assert_response :success
  end

  test "should update approved_team" do
    patch approved_team_url(@approved_team), params: { approved_team: { availability_percentage: @approved_team.availability_percentage, duration: @approved_team.duration, number_of_resources: @approved_team.number_of_resources, project_id: @approved_team.project_id, role: @approved_team.role } }, as: :json
    assert_response :success
  end

  test "should destroy approved_team" do
    assert_difference("ApprovedTeam.count", -1) do
      delete approved_team_url(@approved_team), as: :json
    end

    assert_response :no_content
  end
end
