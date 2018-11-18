"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const endeavor = require("endeavor");
const search_variables_1 = require("../graphql/variables/search.variables");
const graphql_1 = require("../graphql/graphql");
const anilist_user_model_1 = require("../models/anilist.user.model");
const ani_sync_model_1 = require("../models/ani.sync.model");
class AniList {
    static async MediaSearch(search) {
        return new Promise((resolve, reject) => {
            const query = graphql_1.GraphQL.SearchQL;
            const variables = search_variables_1.SearchVariables.Get(search, 1, 100, "ANIME");
            endeavor
                .queryAnilist({ query, variables })
                .then(result => {
                resolve(result);
            })
                .catch(error => {
                reject(error);
            });
        });
    }
    static async MediaQuery(id) {
        return new Promise((resolve, reject) => {
            const query = graphql_1.GraphQL.AnimeQL;
            const variables = search_variables_1.SearchVariables.Media(id);
            endeavor
                .queryAnilist({ query, variables })
                .then(result => {
                resolve(result);
            })
                .catch(error => {
                console.log(error);
            });
        });
    }
    static async UserQuery(username) {
        return new Promise((resolve, reject) => {
            const query = graphql_1.GraphQL.UserQL;
            const variables = search_variables_1.SearchVariables.User(username);
            endeavor
                .queryAnilist({ query, variables })
                .then(result => {
                resolve(result);
            })
                .catch(error => {
                console.log(error);
                const root = new anilist_user_model_1.Root();
                root.data = new anilist_user_model_1.Data();
                root.data.User = null;
                resolve(root);
            });
        });
    }
    static async MediaListQuery(id) {
        return new Promise((resolve, reject) => {
            const query = graphql_1.GraphQL.UserMediaListQL;
            const variables = search_variables_1.SearchVariables.UserMediaList(id);
            endeavor
                .queryAnilist({ query, variables })
                .then(result => {
                resolve(result);
            })
                .catch(error => {
                console.log(error);
                const root = new ani_sync_model_1.ListRoot();
                root.data = new ani_sync_model_1.MediaListData();
                root.data.collection = new ani_sync_model_1.MediaListCollection();
                root.data.collection.lists = [];
                resolve(root);
            });
        });
    }
}
exports.AniList = AniList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JlL2FuaWxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBc0M7QUFDdEMsNEVBQXdFO0FBQ3hFLGdEQUE2QztBQUM3QyxxRUFBMEQ7QUFFMUQsNkRBSWtDO0FBRWxDLE1BQWEsT0FBTztJQUNYLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQWM7UUFDNUMsT0FBTyxJQUFJLE9BQU8sQ0FBUyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUM3QyxNQUFNLEtBQUssR0FBRyxpQkFBTyxDQUFDLFFBQVEsQ0FBQztZQUMvQixNQUFNLFNBQVMsR0FBRyxrQ0FBZSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUMvRCxRQUFRO2lCQUNMLFlBQVksQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsQ0FBQztpQkFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNiLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsQixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNiLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQVU7UUFDdkMsT0FBTyxJQUFJLE9BQU8sQ0FBUyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUM3QyxNQUFNLEtBQUssR0FBRyxpQkFBTyxDQUFDLE9BQU8sQ0FBQztZQUM5QixNQUFNLFNBQVMsR0FBRyxrQ0FBZSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM1QyxRQUFRO2lCQUNMLFlBQVksQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsQ0FBQztpQkFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNiLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsQixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFnQjtRQUM1QyxPQUFPLElBQUksT0FBTyxDQUFTLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzdDLE1BQU0sS0FBSyxHQUFHLGlCQUFPLENBQUMsTUFBTSxDQUFDO1lBQzdCLE1BQU0sU0FBUyxHQUFHLGtDQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pELFFBQVE7aUJBQ0wsWUFBWSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxDQUFDO2lCQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ2IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xCLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsTUFBTSxJQUFJLEdBQUcsSUFBSSx5QkFBSSxFQUFFLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSx5QkFBSSxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsRUFBVTtRQUMzQyxPQUFPLElBQUksT0FBTyxDQUFTLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzdDLE1BQU0sS0FBSyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDO1lBQ3RDLE1BQU0sU0FBUyxHQUFHLGtDQUFlLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3BELFFBQVE7aUJBQ0wsWUFBWSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxDQUFDO2lCQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ2IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xCLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsTUFBTSxJQUFJLEdBQUcsSUFBSSx5QkFBUSxFQUFFLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSw4QkFBYSxFQUFFLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksb0NBQW1CLEVBQUUsQ0FBQztnQkFDakQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDaEMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFyRUQsMEJBcUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGVuZGVhdm9yID0gcmVxdWlyZShcImVuZGVhdm9yXCIpO1xuaW1wb3J0IHsgU2VhcmNoVmFyaWFibGVzIH0gZnJvbSBcIi4uL2dyYXBocWwvdmFyaWFibGVzL3NlYXJjaC52YXJpYWJsZXNcIjtcbmltcG9ydCB7IEdyYXBoUUwgfSBmcm9tIFwiLi4vZ3JhcGhxbC9ncmFwaHFsXCI7XG5pbXBvcnQgeyBSb290LCBEYXRhIH0gZnJvbSBcIi4uL21vZGVscy9hbmlsaXN0LnVzZXIubW9kZWxcIjtcbmltcG9ydCB7IElNZWRpYUxpc3REYXRhIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvYW5pLnN5bmMuaW50ZXJmYWNlXCI7XG5pbXBvcnQge1xuICBMaXN0Um9vdCxcbiAgTWVkaWFMaXN0Q29sbGVjdGlvbixcbiAgTWVkaWFMaXN0RGF0YVxufSBmcm9tIFwiLi4vbW9kZWxzL2FuaS5zeW5jLm1vZGVsXCI7XG5cbmV4cG9ydCBjbGFzcyBBbmlMaXN0IHtcbiAgcHVibGljIHN0YXRpYyBhc3luYyBNZWRpYVNlYXJjaChzZWFyY2g6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxvYmplY3Q+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gR3JhcGhRTC5TZWFyY2hRTDtcbiAgICAgIGNvbnN0IHZhcmlhYmxlcyA9IFNlYXJjaFZhcmlhYmxlcy5HZXQoc2VhcmNoLCAxLCAxMDAsIFwiQU5JTUVcIik7XG4gICAgICBlbmRlYXZvclxuICAgICAgICAucXVlcnlBbmlsaXN0KHsgcXVlcnksIHZhcmlhYmxlcyB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgTWVkaWFRdWVyeShpZDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPG9iamVjdD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgcXVlcnkgPSBHcmFwaFFMLkFuaW1lUUw7XG4gICAgICBjb25zdCB2YXJpYWJsZXMgPSBTZWFyY2hWYXJpYWJsZXMuTWVkaWEoaWQpO1xuICAgICAgZW5kZWF2b3JcbiAgICAgICAgLnF1ZXJ5QW5pbGlzdCh7IHF1ZXJ5LCB2YXJpYWJsZXMgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgVXNlclF1ZXJ5KHVzZXJuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8b2JqZWN0PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBxdWVyeSA9IEdyYXBoUUwuVXNlclFMO1xuICAgICAgY29uc3QgdmFyaWFibGVzID0gU2VhcmNoVmFyaWFibGVzLlVzZXIodXNlcm5hbWUpO1xuICAgICAgZW5kZWF2b3JcbiAgICAgICAgLnF1ZXJ5QW5pbGlzdCh7IHF1ZXJ5LCB2YXJpYWJsZXMgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgIGNvbnN0IHJvb3QgPSBuZXcgUm9vdCgpO1xuICAgICAgICAgIHJvb3QuZGF0YSA9IG5ldyBEYXRhKCk7XG4gICAgICAgICAgcm9vdC5kYXRhLlVzZXIgPSBudWxsO1xuICAgICAgICAgIHJlc29sdmUocm9vdCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBNZWRpYUxpc3RRdWVyeShpZDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPG9iamVjdD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgcXVlcnkgPSBHcmFwaFFMLlVzZXJNZWRpYUxpc3RRTDtcbiAgICAgIGNvbnN0IHZhcmlhYmxlcyA9IFNlYXJjaFZhcmlhYmxlcy5Vc2VyTWVkaWFMaXN0KGlkKTtcbiAgICAgIGVuZGVhdm9yXG4gICAgICAgIC5xdWVyeUFuaWxpc3QoeyBxdWVyeSwgdmFyaWFibGVzIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICBjb25zdCByb290ID0gbmV3IExpc3RSb290KCk7XG4gICAgICAgICAgcm9vdC5kYXRhID0gbmV3IE1lZGlhTGlzdERhdGEoKTtcbiAgICAgICAgICByb290LmRhdGEuY29sbGVjdGlvbiA9IG5ldyBNZWRpYUxpc3RDb2xsZWN0aW9uKCk7XG4gICAgICAgICAgcm9vdC5kYXRhLmNvbGxlY3Rpb24ubGlzdHMgPSBbXTtcbiAgICAgICAgICByZXNvbHZlKHJvb3QpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19