require "test_helper"

class OverviewsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @overview = overviews(:one)
  end

  test "should get index" do
    get overviews_url, as: :json
    assert_response :success
  end

  test "should create overview" do
    assert_difference("Overview.count") do
      post overviews_url, params: { overview: { budget: @overview.budget, goals: @overview.goals, objectives: @overview.objectives, project_id: @overview.project_id, project_overview: @overview.project_overview, purpose: @overview.purpose } }, as: :json
    end

    assert_response :created
  end

  test "should show overview" do
    get overview_url(@overview), as: :json
    assert_response :success
  end

  test "should update overview" do
    patch overview_url(@overview), params: { overview: { budget: @overview.budget, goals: @overview.goals, objectives: @overview.objectives, project_id: @overview.project_id, project_overview: @overview.project_overview, purpose: @overview.purpose } }, as: :json
    assert_response :success
  end

  test "should destroy overview" do
    assert_difference("Overview.count", -1) do
      delete overview_url(@overview), as: :json
    end

    assert_response :no_content
  end
end
